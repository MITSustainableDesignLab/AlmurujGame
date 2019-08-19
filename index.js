/********************************************
 * Setup
 ********************************************/

// get css styles dynamically (make them accessible here)
var style = getComputedStyle(document.body);

/********************************************
 * Configures data visuals (toggle settings at a given point in time)
 ********************************************/
var DEFAULT_HP = 0; // 0 means not high performance
var DEFAULT_WE = 0; // 0 means not water efficient
var DEFAULT_LANDSCAPING = 0; // 0 means no landscaping
var DEFAULT_ROOF_USAGE = 0; // default is roof is not used at all
var DEFAULT_PV_FOOD_SPLIT = .5; // default half the roof for pv, half for food

function reset_defaults() {
  hp.checked = false;
  water_el.checked = false;
  green.checked = false;
  roof.value = DEFAULT_ROOF_USAGE*100;
  split.value = DEFAULT_PV_FOOD_SPLIT*100;
}

/********************************************
 * Loads Data
 ********************************************/
// file with all building info
var FILE = "data.csv"; // filepath to data
var arraydata; // variable to hold data
var ids; // array containing the ids of all adjust_buildings
// makes the full dataset of building info
var database = {}; // set of building objects???
var building_config = {}; // current building configurations id: config
var current_clicked = new Set();
// The set of all buildings, as GeoJSON Objects
// key: id, values:
var buildings = {}
// The sets of commercial, residential, and all buildings
var res_b = residential["features"];
var com_b = commercial["features"];
var all = com_b.concat(res_b);

/********************************************
 * Create a map in the "map" div, set the view to a given place and zoom
 ********************************************/

// Set map around the pentahof or Al-Muruj
const HAM_COORDS = [53.620887, 10.015762];
const ALM_COORDS = [24.758239, 46.663474];
var hamburg_map = L.map('hamburg_map').setView(ALM_COORDS, 16);

// Add a mapbox tile layer
const ACCESS_TOKEN = 'pk.eyJ1IjoiY2hsb2UxMDEiLCJhIjoiY2p4eDR0cXNsMDZqbzNjb2c2bzRudmhpayJ9.sQ4dnM5SVZKNW_mFjHm5gA';
const URL_TEMPLATE = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

L.tileLayer(URL_TEMPLATE, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: ACCESS_TOKEN
}).addTo(hamburg_map);


// gets building coords and assigns it to arraydata
getdatafromfile(FILE)
  .then(function(result) { // convert data to JSON
    return new Promise(function(resolve, reject) {
      arraydata = $.csv.toObjects(result);
      resolve(arraydata);
      reject(new Error("Error loading building data."))
    });
  })
  .then(function(result) {
    return new Promise(function (resolve) {
      process_data(result, database); // populate the database with result
      ids = Object.keys(database); // array containing the ids of all buildings
      populate(current_clicked); // populate the values on site from "current" object
      resolve(database); // returns the populated database of buildings
      reject(new Error("Error populating building data."))
    })
  }).then(function(result) {
    return new Promise(function (resolve) {
      // for each building json object in the set all
      for (building of all) {
        // make a new geojson object with the buildings:
        var b = new L.GeoJSON(building, {
          onEachFeature: onEachFeature,
          style: {
            color: style.getPropertyValue('--main-color'),
            opacity: 0.7
          }
        // }).bindPopup(function(layer) { // bind a popup to the geojson object
        //     return calculate_individual(co2, building.id, 0);
        }).addTo(hamburg_map); // add the geojson obj to the map tileLayer
        // add the geojson obj to the buildings set
        buildings[building.id] = b;
      };
    });
  });

// base calculations
var base = {
  capex: 0, // on top
  co2: 0,
  water: 0,
  jobs: 0,
  opex: 0,
  energy: 0,
  food: 0,
};

// get clickable elements
hp = document.getElementById("toggleHP");
water_el = document.getElementById("toggleWater");
green = document.getElementById("toggleGreen");
roof = document.getElementById("toggleRoof");
split = document.getElementById("togglePVFood");

// get building type selector dropdown
building_type = document.getElementById('building-type');
res_button = document.getElementById("residential");
com_button = document.getElementById("combtn");
//all_button = document.getElementById("allbtn");
none_button = document.getElementById("nonebtn");

// add click event listeners
hp.addEventListener("click", toggleHP);
water_el.addEventListener("click", togglewater);
green.addEventListener("click", togglegreen);
roof.addEventListener("click", sliderroof);
split.addEventListener("click", slidersplit);
building_type.addEventListener("change", toggle_building_type)
// res_button.addEventListener("click", toggle_res);
// com_button.addEventListener("click", toggle_com);
//all_button.addEventListener("click", toggle_all_buildings);
// none_button.addEventListener("click", toggle_none);

function adjust_buildings(property, val) {
  var ids = Array.from(current_clicked) // because set object not iterable
  ids.forEach( function(id) {
    building_config[id][property] = val;
  })
}

function toggleHP() {
  toggle(hp, 'hp');
}

function togglewater() {
  toggle(water_el, 'we');
}

function togglegreen() {
  toggle(green, 'landscaping');
}

function toggle(obj, property) {
  if (obj.checked == true) {
    adjust_buildings(property, 1);
  } else {
    adjust_buildings(property, 0);
  }
  populate(current_clicked);
}

function sliderroof() {
  slider('roof_usage', roof.value/100);
}

function slidersplit() {
  slider('roof_split', split.value/100);
}

function slider(property, val) {
  adjust_buildings(property, val);
  populate(current_clicked);
}

function toggle_building_type(event) {
  if (building_type.value=='all') {
    toggle_all_buildings();
  } else if (building_type.value=='residential') {
    toggle_res();
  } else if (building_type.value=='commercial') {
      toggle_com();
  } else if (building_type.value='none') {
    toggle_none();
  }
}

function onClick(e) {
  var id = e.target.feature.id
  if (current_clicked.has(id)) {
    current_clicked.delete(id);
    buildings[id].setStyle({color: style.getPropertyValue('--main-color')});
  } else {
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function onEachFeature(feature, layer) {
    // bind click and mousover popups
    layer.on({
        click: onClick,
        mouseover: function(e) {
          this.openPopup();
        },
        mouseout: function(e) {
          this.closePopup();
        }
    });
}

function toggle_res() {
  resetcolors();
  for (var i in res_b) {
    id = res_b[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_com() {
  resetcolors();
  for (var i in com_b) {
    id = com_b[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_all_buildings() {
  resetcolors();
  for (var i in all) {
    id = all[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_none() {
  resetcolors();
  var ids = Array.from(current_clicked) // because set object not iterable
  ids.forEach( function(id) {
    buildings[id].setStyle({color: style.getPropertyValue('--main-color')});
  })
  current_clicked.clear();
  reset_defaults();
}

/*****************************************************
 * Add heat maps!
 *****************************************************/

// get clickable elements
co2res = document.getElementById("CO2");
waterres = document.getElementById("Water");
jobsres = document.getElementById("Jobs");
energyres = document.getElementById("Energy");
costres = document.getElementById("Cost");
foodres = document.getElementById("Food");
clearcolor = document.getElementById("clearcolor");

// add click event listeners
co2res.addEventListener("click", co2h);
waterres.addEventListener("click", waterh);
jobsres.addEventListener("click", jobsh);
energyres.addEventListener("click", energyh);
costres.addEventListener("click", opexh);
foodres.addEventListener("click", foodh);
// clearcolor.addEventListener("click", resetcolors);

function resetcolors() {
  for (var i in all) {
    id = all[i].id;
    buildings[id].setStyle({color: style.getPropertyValue('--main-color')});
  }
  var curr = Array.from(current_clicked) // because set object not iterable
  curr.forEach( function(id) {
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  })
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

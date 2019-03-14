/********************************************
 * Setup
 ********************************************/

// get css styles dynamically (make them accessible here)
var style = getComputedStyle(document.body);


/********************************************
 * Configuration (toggle settings at a given point in time)
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

function populate_building_config(d) {
  var obj = {
    // configuration
    hp: DEFAULT_HP, // high performance
    we: DEFAULT_WE, // water efficient
    landscaping: DEFAULT_LANDSCAPING, // landscaping
    roof_usage: DEFAULT_ROOF_USAGE,
    roof_split: DEFAULT_PV_FOOD_SPLIT,
  };
  return obj;
};


/********************************************
 * Data loading
 ********************************************/


function populate_data(d) {
  var building = {
    use: d.Use,
    name: d.BuildingName,
    hp: {
      capex: parseFloat(d.InvestmentCostHP),
      co2: parseFloat(d.CO2EmissionsHighPerformance),
      water: parseFloat(d.WaterHighPerformance),
      jobs: parseFloat(d.JobsHighPerformance),
      opex: parseFloat(d.OpCostHP),
    },
    we: {
      capex: parseFloat(d.InvestmentCostWaterEfficient),
      co2: parseFloat(d.CO2EmissionsWaterEfficient),
      water: parseFloat(d.WaterWaterEfficient),
      jobs: parseFloat(d.JobsWaterEfficient),
      opex: parseFloat(d.OpCostWaterEfficient),
      energy: parseFloat(d.EnergyWaterEfficient),
    },
    landscaping: {
      capex: parseFloat(d.InvestmentCostGreenery),
      co2: parseFloat(d.CO2EmissionsGreenery),
      water: parseFloat(d.WaterGreenery),
      jobs: parseFloat(d.JobsGreenery),
      opex: parseFloat(d.OpCostGreenery),
      energy: parseFloat(d.EnergyGreenery),
    },
    pv: {
      capex: parseFloat(d.InvestmentCostPVPanels),
      co2: parseFloat(d.CO2EmissionsPVPanels),
      jobs: parseFloat(d.JobsPVPanels),
      opex: parseFloat(d.OpCostPVPanels),
      energy: parseFloat(d.EnergyPVPanels),
    },
    greenhouse: {
      capex: parseFloat(d.InvestmentCostGreenhouse),
      co2: parseFloat(d.CO2EmissionsGreenhouse),
      water: parseFloat(d.WaterGreenhouse100),
      jobs: parseFloat(d.JobsGreenhouse),
      opex: parseFloat(d.OpCostGreenhouse),
      energy: parseFloat(d.EnergyGreenhouse),
      food: parseFloat(d.FoodPercentageGreenhouse100),
    },
  };
  return building;
}


function getdatafromfile(filename) {
  // Read annotation file. Example : %timeinstant \t %value \n
  // Return an array of string
  var arraydata;
  $.ajax({
    type: "GET",
    url: filename,
    dataType: "text",
    async: false,
    success: function(csv) {arraydata = $.csv.toObjects(csv); }
  });
  return arraydata;
}

function process_data(data) {
  data.forEach(function(d) {
    if (d.BuildingID.length > 3) {
      database[d.BuildingID] = populate_data(d);
      base.co2 += parseFloat(d.CO2EmissionsBase); // sum of water energy and food c02 base
      base.water += parseFloat(d.WaterBase);
      base.jobs += parseFloat(d.JobsBase);
      base.energy += parseFloat(d.EnergyBase);
      base.opex += parseFloat(d.OpCostBase);  // this is sum of food, water energy base
      base.food += parseFloat(d.FoodPercentageBase);
      building_config[d.BuildingID] = populate_building_config();
    }
  });
};

var file = "data.csv";
arraydata = getdatafromfile(file);


// populated in process data
var database = {}; // full data set
var building_config = {}; // current building configurations id: config
var base = {
  capex: 0, // on top
  co2: 0,
  water: 0,
  jobs: 0,
  opex: 0,
  energy: 0,
  food: 0,
};

process_data(arraydata);

const ids = Object.keys(database);



/********************************************
 * Populate the values on site from "current" object
 ********************************************/
populate();

function populate() { // populate the bottom row with correct values
  var values = calculate();
  console.log(values)
  document.getElementById("capex").innerHTML = numberWithCommas(Math.round(values.capex)); // in millions
  document.getElementById("co2val").innerHTML = numberWithCommas(Math.round(values.co2/1000)); // kg to tons
  document.getElementById("waterval").innerHTML = numberWithCommas(Math.round(values.water/1000)); // liters to m^3
  document.getElementById("jobsval").innerHTML = numberWithCommas(Math.round(values.jobs));
  document.getElementById("opexval").innerHTML = numberWithCommas(Math.round(values.opex)); // in millions
  document.getElementById("energyval").innerHTML = numberWithCommas(Math.round(values.energy/1000)); // kWH to gWH
  document.getElementById("foodval").innerHTML = numberWithCommas(Math.round(values.food));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculate() {
  var current = {
    capex: calculate_capex(),
    co2: calculate_co2(),
    water: calculate_water(),
    jobs: calculate_jobs(),
    opex: calculate_opex(),
    energy: calculate_energy(),
    food: calculate_food(),
  };
  return current;
};


/* TODO: get rid of repeated code here */

function calculate_capex() {
  capex = base.capex;
  for (const id of ids) {
    capex += building_config[id].hp * database[id].hp.capex;
    capex += building_config[id].we * database[id].we.capex;
    capex += building_config[id].landscaping * database[id].landscaping.capex;
    capex += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.capex;
    capex += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.capex;
  };
  return capex;
};

function calculate_co2() {
  co2 = base.co2;
  for (const id of ids) {
    co2 += building_config[id].hp * database[id].hp.co2;
    co2 += building_config[id].we * database[id].we.co2;
    co2 += building_config[id].landscaping * database[id].landscaping.co2;
    co2 += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.co2;
    co2 += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.co2;
  };
  return co2;
};


function calculate_water() {
  water = base.water;
  for (const id of ids) {
    water += building_config[id].hp * database[id].hp.water;
    water += building_config[id].we * database[id].we.water;
    water += building_config[id].landscaping * database[id].landscaping.water;
    water += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.water;
  };
  return water;
};


function calculate_jobs() {
  jobs = base.jobs;
  for (const id of ids) {
    jobs += building_config[id].hp * database[id].hp.jobs;
    jobs += building_config[id].we * database[id].we.jobs;
    jobs += building_config[id].landscaping * database[id].landscaping.jobs;
    jobs += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.jobs;
    jobs += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.jobs;
  };
  return jobs;
};


function calculate_opex() {
  opex = base.opex
  for (const id of ids) {
    opex += building_config[id].hp * database[id].hp.opex;
    opex += building_config[id].we * database[id].we.opex;
    opex += building_config[id].landscaping * database[id].landscaping.opex;
    opex += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.opex;
    opex += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.opex;
  };
  return opex;
}


function calculate_energy() {
  energy = base.energy
  for (const id of ids) {
    energy += building_config[id].we * database[id].we.energy;
    energy += building_config[id].landscaping * database[id].landscaping.energy;
    energy += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.energy;
    energy += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.energy;
  };
  return energy;
}

function calculate_food() {
  food = base.food
  for (const id of ids) {
    food += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.food;
  };
  return food;
}


/**************************************************
 * Modifications as needed!
 **************************************************/

var current_clicked = new Set();

// get clickable elements
hp = document.getElementById("toggleHP");
water_el = document.getElementById("toggleWater");
green = document.getElementById("toggleGreen");
roof = document.getElementById("toggleRoof");
split = document.getElementById("togglePVFood");

res_button = document.getElementById("resbtn");
com_button = document.getElementById("combtn");
all_button = document.getElementById("allbtn");
none_button = document.getElementById("nonebtn");

// add click event listeners
hp.addEventListener("click", toggleHP);
water_el.addEventListener("click", togglewater);
green.addEventListener("click", togglegreen);
roof.addEventListener("click", sliderroof);
split.addEventListener("click", slidersplit);

res_button.addEventListener("click", toggle_res);
com_button.addEventListener("click", toggle_com);
all_button.addEventListener("click", toggle_all_buildings);
none_button.addEventListener("click", toggle_none);

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
  populate();
}

function sliderroof() {
  slider('roof_usage', roof.value/100);
}


function slidersplit() {
  slider('roof_split', split.value/100);
}

function slider(property, val) {
  adjust_buildings(property, val);
  populate();
}


/********************************************
 * Create a map in the "map" div, set the view to a given place and zoom
 ********************************************/
var map = L.map('map', {
  //center: [0, 0],
  crs: L.CRS.Simple,
  //maxBounds: [[-2000, -2000], [2000, 2000]],
  minZoom: -2 //zoom: -1,
}).setView([0,0], -2);


bounds = [[-2000, -2000], [2000, 2000]];
map.fitBounds(bounds);


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
    //bind click
    layer.on({
        click: onClick
    });
}

var res_b = residential["features"];
var com_b = commercial["features"];
var all = com_b.concat(res_b);

var buildings = {}

for (var i in all) {
  var building = all[i];
  var b = new L.GeoJSON(building, {
    onEachFeature: onEachFeature,
    style: {
      color: style.getPropertyValue('--main-color'),
      opacity: 0.7
    }
  });
  buildings[all[i].id] = b
  b.addTo(map);
}

function toggle_res() {
  for (var i in res_b) {
    id = res_b[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_com() {
  for (var i in com_b) {
    id = com_b[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_all_buildings() {
  for (var i in all) {
    id = all[i].id;
    current_clicked.add(id);
    buildings[id].setStyle({color: style.getPropertyValue('--clicked-color')});
  }
  reset_defaults();
}

function toggle_none() {
  var ids = Array.from(current_clicked) // because set object not iterable
  console.log(ids)
  ids.forEach( function(id) {
    buildings[id].setStyle({color: style.getPropertyValue('--main-color')});
  })
  current_clicked.clear();
  reset_defaults();
}

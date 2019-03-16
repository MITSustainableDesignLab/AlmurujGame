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

function parseData(d, val) {
  if (d[val]) {
    return parseFloat(d[val]);
  }
  // log an error here
  console.log('val not found');
  console.log(val)
}

function populate_data(d) {
  var building = {
    use: d.Use,
    name: d.BuildingName,
    base: {
      capex: 0,
      co2: parseData(d, 'CO2EmissionsBase'),
      water: parseData(d, 'WaterBase'),
      jobs: parseData(d, 'JobsBase'),
      opex: parseData(d, 'OpCostBase'),
      energy: parseData(d, 'EnergyBase'),
      food: 0,
    },
    hp: {
      capex: parseData(d, 'InvestmentCostHP'),
      co2: parseData(d, 'CO2EmissionsHighPerformance'),
      water: parseData(d, 'WaterHighPerformance'),
      jobs: parseData(d, 'JobsHighPerformance'),
      opex: parseData(d, 'OpCostHP'),
      energy: parseData(d, 'EnergyHighPerformance'),
    },
    we: {
      capex: parseData(d, 'InvestmentCostWaterEfficient'),
      co2: parseData(d, 'CO2EmissionsWaterEfficient'),
      water: parseData(d, 'WaterWaterEfficient'),
      jobs: parseData(d, 'JobsWaterEfficient'),
      opex: parseData(d, 'OpCostWaterEfficient'),
      energy: parseData(d, 'EnergyWaterEfficient'),
    },
    landscaping: {
      capex: parseData(d, 'InvestmentCostGreenery'),
      co2: parseData(d, 'CO2EmissionsGreenery'),
      water: parseData(d, 'WaterGreenery'),
      jobs: parseData(d, 'JobsGreenery'),
      opex: parseData(d, 'OpCostGreenery'),
      energy: parseData(d, 'EnergyGreenery'),
    },
    pv: {
      capex: parseData(d, 'InvestmentCostPVPanels'),
      co2: parseData(d, 'CO2EmissionsPVPanels'),
      jobs: parseData(d, 'JobsPVPanels'),
      opex: parseData(d, 'OpCostPVPanels'),
      energy: parseData(d, 'EnergyPVPanels'),
    },
    greenhouse: {
      capex: parseData(d, 'InvestmentCostGreenhouse'),
      co2: parseData(d, 'CO2EmissionsGreenhouse'),
      water: parseData(d, 'WaterGreenhouse100'),
      jobs: parseData(d, 'JobsGreenhouse'),
      opex: parseData(d, 'OpCostGreenhouse'),
      energy: parseData(d, 'EnergyGreenhouse'),
      food: parseData(d, 'FoodPercentageGreenhouse100'),
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
  document.getElementById("capex").innerHTML = numberWithCommas(Math.round(values.capex/1000)); // in millions
  document.getElementById("co2val").innerHTML = numberWithCommas(Math.round(values.co2/1000)); // kg to tons
  document.getElementById("waterval").innerHTML = numberWithCommas(Math.round(values.water/1000)); // liters to m^3
  document.getElementById("jobsval").innerHTML = numberWithCommas(Math.round(values.jobs));
  document.getElementById("opexval").innerHTML = numberWithCommas(Math.round(values.opex/1000)); // in millions
  document.getElementById("energyval").innerHTML = numberWithCommas(Math.round(values.energy/1000000)); // kWH to gWH
  document.getElementById("foodval").innerHTML = numberWithCommas(Math.round(values.food));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculate() {
  var current = {
    capex: calculate_capex(ids, 1),
    co2: calculate_co2(ids, 1),
    water: calculate_water(ids, 1),
    jobs: calculate_jobs(ids, 1),
    opex: calculate_opex(ids, 1),
    energy: calculate_energy(ids, 1),
    food: calculate_food(ids, 1),
  };
  return current;
};


/* TODO: get rid of repeated code here */

function calculate_capex(ids, include_base) {
  capex = 0;
  if (include_base) {
    capex = base.capex;
  }
  for (const id of ids) {
    if (!(include_base)) {
      capex += database[id].base.capex;
    }
    capex += building_config[id].hp * database[id].hp.capex;
    capex += building_config[id].we * database[id].we.capex;
    capex += building_config[id].landscaping * database[id].landscaping.capex;
    capex += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.capex;
    capex += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.capex;
  };
  return capex;
};

function calculate_co2(ids, include_base) {
  co2 = 0;
  if (include_base) {
    co2 = base.co2;
  }
  for (const id of ids) {
    if (!(include_base)) {
      co2 += database[id].base.co2;
    }
    co2 += building_config[id].hp * database[id].hp.co2;
    co2 += building_config[id].we * database[id].we.co2;
    co2 += building_config[id].landscaping * database[id].landscaping.co2;
    co2 += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.co2;
    co2 += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.co2;
  };
  return co2;
};

function calculate_water(ids, include_base) {
  water = 0;
  if (include_base) {
    water = base.water;
  }
  for (const id of ids) {
    if (!(include_base)) {
      water += database[id].base.water;
    }
    water += building_config[id].hp * database[id].hp.water;
    water += building_config[id].we * database[id].we.water;
    water += building_config[id].landscaping * database[id].landscaping.water;
    water += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.water;
  };
  return water;
};

function calculate_jobs(ids, include_base) {
  jobs = 0;
  if (include_base) {
    jobs = base.jobs;
  }
  for (const id of ids) {
    if (!(include_base)) {
      jobs += database[id].base.jobs;
    }
    jobs += building_config[id].hp * database[id].hp.jobs;
    jobs += building_config[id].we * database[id].we.jobs;
    jobs += building_config[id].landscaping * database[id].landscaping.jobs;
    jobs += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.jobs;
    jobs += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.jobs;
  };
  console.log(jobs);
  return jobs;
};


function calculate_opex(ids, include_base) {
  opex = 0;
  if (include_base) {
    opex = base.opex;
  }
  for (const id of ids) {
    if (!(include_base)) {
      opex += database[id].base.opex;
    }
    opex += building_config[id].hp * database[id].hp.opex;
    opex += building_config[id].we * database[id].we.opex;
    opex += building_config[id].landscaping * database[id].landscaping.opex;
    opex += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.opex;
    opex += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.opex;
  };
  return opex;
}


function calculate_energy(ids, include_base) {
  energy = 0;
  if (include_base) {
    energy = base.energy;
  }
  for (const id of ids) {
    if (!(include_base)) {
      energy += database[id].base.energy;
    }
    energy += building_config[id].hp * database[id].hp.energy;
    energy += building_config[id].we * database[id].we.energy;
    energy += building_config[id].landscaping * database[id].landscaping.energy;
    energy += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.energy;
    energy += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.energy;
  };
  return energy;
}

function calculate_food(ids, include_base) {
  food = 0;
  if (include_base) {
    food = base.food;
  }
  for (const id of ids) {
    if (!(include_base)) {
      food += database[id].base.food;
    }
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
//all_button = document.getElementById("allbtn");
none_button = document.getElementById("nonebtn");

// add click event listeners
hp.addEventListener("click", toggleHP);
water_el.addEventListener("click", togglewater);
green.addEventListener("click", togglegreen);
roof.addEventListener("click", sliderroof);
split.addEventListener("click", slidersplit);

res_button.addEventListener("click", toggle_res);
com_button.addEventListener("click", toggle_com);
//all_button.addEventListener("click", toggle_all_buildings);
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
clearcolor.addEventListener("click", resetcolors);

function resetcolors() {
  console.log(current_clicked);
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

/*map from orange (244, 190, 66) to red (244, 40, 66)*/
function heatMapColorforValue(value) {
  var a=(1-value);
  var Y=Math.floor(200*a);
  r=244;g=Y;b=66;
  var str = rgbToHex(r, g, b);
  return str;
}

// subtract out min and divide by max
function normalize(calc_func) {
  var numbers = {};
  for (var i in all) {
    var ls = [all[i].id]; 
    var calculated = calc_func(ls, 0) || 0;
    numbers[all[i].id] = +calculated;
  }
  //get min and subtract out min
  min_val = Math.min.apply(null, Object.values(numbers));
  for (var id in numbers) {
    numbers[id] -= min_val;
  }

  //get max and divide
  max_val = Math.max.apply(null, Object.values(numbers));
  if (max_val > 0) {
    for (var id in numbers) {
      numbers[id] /= max_val;
    }
  }
  return numbers;
}

function heat(calc_func) {
  normalized = normalize(calc_func);
  for (var id in normalized) {
    _color = heatMapColorforValue(normalized[id]);
    buildings[id].setStyle({color: _color});
  }
}


function co2h() {
  heat(calculate_co2)
}

function waterh() {
  heat(calculate_water)
}

function jobsh() {
  heat(calculate_jobs)
}

function opexh() {
  heat(calculate_opex)
}

function energyh() {
  heat(calculate_energy)
}

function foodh() {
  heat(calculate_food)
}

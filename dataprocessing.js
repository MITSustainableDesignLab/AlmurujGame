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

function getdatafromfile(filename) {
  // Read annotation file. Example : %timeinstant \t %value \n
  // Return an array of string
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: filename,
      dataType: "text",
      async: true,
      success: function(data) {
        resolve(data);
      },
      error: function(req, status, err) {
        console.log('Oops, something went wrong,', status, err);
      }
    })
  });
}

function process_data(data, db) {
  data.forEach(function(d) {
    if (d.BuildingID.length > 3) {
      db[d.BuildingID] = populate_data(d);
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

function calculate(selected_buildings) {
  var selected_ids = Array.from(selected_buildings);
  var current = {
    capex: calculate_capex(selected_ids, 1),
    co2: calculate_co2(selected_ids, 1),
    water: calculate_water(selected_ids, 1),
    jobs: calculate_jobs(selected_ids, 1),
    opex: calculate_opex(selected_ids, 1),
    energy: calculate_energy(selected_ids, 1),
    food: calculate_food(selected_ids, 1),
  };
  return current;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* TODO: get rid of repeated code here */
/* Calculate CO2 and other measures for each building*/
function calculate_individual(metric, id, include_base) {
  var value = 0;
  if (!(include_base)) {
    value += database[id].base[metric];
  }
  value += building_config[id].hp * database[id].hp[metric];
  value += building_config[id].we * database[id].we[metric];
  value += building_config[id].landscaping * database[id].landscaping[metric];
  value += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv[metric];
  value += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse[metric];
  return value;
};

function calculate_capex(ids, include_base) {
  capex = 0;
  if (include_base) {
    capex = base.capex;
  }
  for (const id of ids) {
    capex += calculate_individual("capex", id, include_base);
    // if (!(include_base)) {
    //   capex += database[id].base.capex;
    // }
    // capex += building_config[id].hp * database[id].hp.capex;
    // capex += building_config[id].we * database[id].we.capex;
    // capex += building_config[id].landscaping * database[id].landscaping.capex;
    // capex += building_config[id].roof_usage * building_config[id].roof_split * database[id].pv.capex;
    // capex += building_config[id].roof_usage * (1-building_config[id].roof_split) * database[id].greenhouse.capex;
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

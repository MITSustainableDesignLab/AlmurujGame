var togglearray = [0,0,0,myRange1.value/100,myRange2.value/100];

var CO2Total = 0;
var percent1 = parseInt(myRange1.value);

var percent2;
var SumCO2EmissionsBase;

function toggleHP() {
  // Get the checkbox
    var checkHP = document.getElementById("toggleHP");
  // If the checkbox is checked, display the output text
    if (checkHP.checked == true){
    togglearray[0] = 1;
  } else {
    togglearray[0] = 0;
  }console.log(togglearray);
}
    
function toggleWater() {
    var checkWater = document.getElementById("toggleWater");
    if (checkWater.checked == true){
    togglearray[1] = 1;
  } else {
    togglearray[1] = 0;
  }console.log(togglearray);
}

function toggleGreen() {
    var checkGreen = document.getElementById("toggleGreen");
    if (checkGreen.checked == true){
    togglearray[2] = 1;
  } else {
    togglearray[2] = 0;
  }console.log(togglearray);
}
    
function slider1(){
    if(myRange1 != null){
    togglearray[3]=myRange1.value/100;;
    console.log(togglearray);
}}   

function slider2(){
    if(myRange2 != null){
    togglearray[4]=myRange2.value/100;
    console.log(togglearray)
    }
}
    
    var Occupancy = [];
    //var LandscapeArea = [];
    //var ConditionedArea = [];
    //var RooftopArea = [];
    //var EnergyBase = [];
    //var JobsBase = [];
    //var OpCostEnergyBase = [];
    //var OpCostWaterBase = [];
    //var OpCostFoodBase = [];
    //var OpCostBase = [];
    //var WaterBase = [];
    //var CO2EnergyBase = [];
    //var CO2WaterBase = [];
    //var CO2FoodBase = [];
    
    //for CO2 calculation
    var CO2EmissionsBase = [];
    var CO2EmissionsHighPerformance = [];
    var CO2EmissionsWaterEfficient = [];
    var CO2EmissionsGreenery = [];
    var CO2EmissionsPVPanels = [];
    var CO2EmissionsGreenhouse = [];
    
    //for Job calculation
    var JobsBase = [];
    var JobsHighPerformance = [];
    var JobsWaterEfficient = [];
    var JobsGreenery = [];
    var JobsPVPanels = [];
    var JobsGreenhouse = [];
    
    //for Cost calculation
    var OpCostBase = [];
    var OpCostHP = [];
    var OpCostWaterEfficient = [];
    var OpCostGreenery = [];
    var OpCostPVPanels = [];
    var OpCostGreenhouse = [];
    
    //for Food Percentage calculation
    var FoodPercentageBase = [];
    var FoodPercentageGreenhouse100 = [];
    
d3.csv("buildings.csv").then(function(data){
    
    
    togglearray[0]=2;
    console.log(togglearray)
    data.forEach(function(d){
        
    d.Occupancy = +d.Occupancy;     
    Occupancy.push(d.Occupancy);
        
    d.LandscapeArea = +d.LandscapeArea;
    d.ConditionedArea = +d.ConditionedArea;
    d.RooftopArea = +d.RooftopArea;
    d.EnergyBase = +d.EnergyBase;
    
    d.JobsBase = +d.JobsBase;
    JobsBase.push(d.JobsBase);
        
    d.OpCostEnergyBase = +d.OpCostEnergyBase;
    d.OpCostWaterBase = +d.OpCostWaterBase;
    d.OpCostFoodBase = +d.OpCostFoodBase;
    
    d.OpCostBase = +d.OpCostBase;
    OpCostBase.push(d.OpCostBase);
    
    d.FoodPercentageBase = +d.FoodPercentageBase;
    FoodPercentageBase.push(d.FoodPercentageBase);
    
    d.WaterBase = +d.WaterBase;
    d.CO2EnergyBase = +d.CO2EnergyBase;
    d.CO2WaterBase = +d.CO2WaterBase;
    d.CO2FoodBase = +d.CO2FoodBase;
    
    d.CO2EmissionsBase = +d.CO2EmissionsBase;
    CO2EmissionsBase.push(d.CO2EmissionsBase);
        
    d.EnergyHighPerformance = +d.EnergyHighPerformance;
    
    d.JobsHighPerformance = +d.JobsHighPerformance;
    JobsHighPerformance.push(d.JobsHighPerformance);
        
    d.OpCostEnergyHP = +d.OpCostEnergyHP,
    d.OpCostWaterHP = +d.OpCostWaterHP,
    d.OpCostFoodHP = +d.OpCostFoodHP,
    
    d.OpCostHP = +d.OpCostHP;
    OpCostHP.push(d.OpCostHP);
        
    d.InvestmentCostHP = +d.InvestmentCostHP,
    d.WaterHighPerformance = +d.WaterHighPerformance,
    d.CO2EnergyHP = +d.CO2EnergyHP,
    d.CO2WaterHP = +d.CO2WaterHP,
    d.CO2FoodHP = +d.CO2FoodHP;
    
    d.CO2EmissionsHighPerformance = +d.CO2EmissionsHighPerformance;
    CO2EmissionsHighPerformance.push(d.CO2EmissionsHighPerformance);
        
    d.EnergyWaterEfficient = +d.EnergyWaterEfficient,
        
    d.JobsWaterEfficient = +d.JobsWaterEfficient;
    JobsWaterEfficient.push(d.JobsWaterEfficient);
        
    d.OpCostEnergyWaterEfficient = +d.OpCostEnergyWaterEfficient,
    d.OpCostWaterWaterEfficient = +d.OpCostWaterWaterEfficient,
    d.OpCostFoodWaterEfficient = +d.OpCostFoodWaterEfficient,
    
    d.OpCostWaterEfficient = +d.OpCostWaterEfficient;
    OpCostWaterEfficient.push(d.OpCostWaterEfficient);
        
    d.InvestmentCostWaterEfficient = +d.InvestmentCostWaterEfficient,
    d.WaterWaterEfficient = +d.WaterWaterEfficient,
    d.CO2EnergyWaterEfficient = +d.CO2EnergyWaterEfficient,
    d.CO2WaterWaterEfficient = +d.CO2WaterWaterEfficient,
    d.CO2FoodWaterEfficient = +d.CO2FoodWaterEfficient,
    
    d.CO2EmissionsWaterEfficient = +d.CO2EmissionsWaterEfficient,
    CO2EmissionsWaterEfficient.push(d.CO2EmissionsWaterEfficient);
    
    d.EnergyGreenery = +d.EnergyGreenery,
    
    d.JobsGreenery = +d.JobsGreenergy,
    JobsGreenery.push(d.JobsGreenery);
        
    d.OpCostEnergyGreenery = +d.OpCostEnergyGreenery,
    d.OpCostWaterGreenery = +d.OpCostWaterGreenery,
    d.OpCostFoodGreenery = +d.OpCostFoodGreenery,
    
    d.OpCostGreenery = +d.OpCostGreenery;
    OpCostGreenery.push(d.OpCostGreenery);
        
    d.InvestmentCostGreenery = +d.InvestmentCostGreenery,
    d.WaterGreenery = +d.WaterGreenery,
    d.CO2EnergyGreenery = +d.CO2EnergyGreenery,
    d.CO2WaterGreenery = +d.CO2WaterGreenery,
    d.CO2FoodGreenery = +d.CO2FoodGreenery,
        
    d.CO2EmissionsGreenery = +d.CO2EmissionsGreenery,
    CO2EmissionsGreenery.push(d.CO2EmissionsGreenery);
        
    d.EnergyPVPanels = +d.EnergyPVPanels,
    
    d.JobsPVPanels = +d.JobsPVPanels,
    JobsPVPanels.push(d.JobsPVPanels);
        
    d.OpCostEnergyPVPanels = +d.OpCostEnergyPVPanels,
    d.OpCostWaterPVPanels = +d.OpCostWaterPVPanels,
    d.OpCostFoodPVPanels = +d.OpCostFoodPVPanels,
    
    d.OpCostPVPanels = +d.OpCostPVPanels;
    OpCostPVPanels.push(d.OpCostPVPanels);
        
    d.InvestmentCostOVPanels = +d.InvestmentCostOVPanels,
    d.CO2EnergyPV = +d.CO2EnergyPV,
    d.CO2WaterPV = +d.CO2WaterPV,
    d.CO2FoodPV = +d.CO2FoodPV,
        
    d.CO2EmissionsPVPanels = +d.CO2EmissionsPVPanels,
    CO2EmissionsPVPanels.push(d.CO2EmissionsPVPanels);
        
    d.EnergyGreenhouse = +d.EnergyGreenhouse,
    
    d.JobsGreenhouse = +d.JobsGreenhouse,
    JobsGreenhouse.push(d.JobsGreenhouse);
        
    d.OpCostEnergyGreenhouse = +d.OpCostEnergyGreenhouse,
    d.OpCostWaterGreenhouse = +d.OpCostWaterGreenhouse,
    d.OpCostFoodGreenhouse = +d.OpCostFoodGreenhouse,
    
    d.OpCostGreenhouse = +d.OpCostGreenhouse;
    OpCostGreenhouse.push(d.OpCostGreenhouse);
        
    d.InvestmentCostGreenhouse = +d.InvestmentCostGreenhouse,
    
    d.FoodPercentageGreenhouse100 = +d.FoodPercentageGreenhouse100,
    FoodPercentageGreenhouse100.push(d.FoodPercentageGreenhouse100);
        
    d.WaterGreenhouse100 = +d.WaterGreenhouse100,
    d.CO2EnergyGreenhouse = +d.CO2EnergyGreenhouse,
    d.CO2WaterGreenhouse = +d.CO2WaterGreenhouse,
    d.CO2FoodGreenhouse = +d.CO2FoodGreenhouse,
    
    d.CO2EmissionsGreenhouse = +d.CO2EmissionsGreenhouse;
    CO2EmissionsGreenhouse.push(d.CO2EmissionsGreenhouse);   
    });//end of for each function
    
    //Sum CO2
    var SumOccupancy = getSum(Occupancy);
    var SumCO2EmissionsBase = getSum(CO2EmissionsBase);
    var SumCO2EmissionsHighPerformance = getSum(CO2EmissionsHighPerformance);
    var SumCO2EmissionsWaterEfficient = getSum(CO2EmissionsWaterEfficient);
    var SumCO2EmissionsGreenery = getSum(CO2EmissionsGreenery);
    var SumCO2EmissionsPVPanels = getSum(CO2EmissionsPVPanels);
    var SumCO2EmissionsGreenhouse = getSum(CO2EmissionsGreenhouse);
    var CO2Total = SumCO2EmissionsBase+SumCO2EmissionsHighPerformance+SumCO2EmissionsWaterEfficient+SumCO2EmissionsGreenery+SumCO2EmissionsPVPanels+SumCO2EmissionsGreenhouse;
    
    //Sum Job
    var SumJobsBase = getSum(JobsBase);
    var SumJobsHighPerformance = getSum(JobsHighPerformance);
    var SumJobsWaterEfficient = getSum(JobsWaterEfficient);
    var SumJobsGreenery = getSum(JobsGreenery);
    var SumJobsPVPanels = getSum(JobsPVPanels);
    var SumJobsGreenhouse = getSum(JobsGreenhouse);
    var JobsTotal = SumJobsBase+SumJobsHighPerformance+SumJobsWaterEfficient+SumJobsGreenery+SumJobsPVPanels+SumJobsGreenhouse;
    
    //Sum Cost
    var SumOpCostBase = getSum(OpCostBase);
    var SumOpCostHP = getSum(OpCostHP);
    var SumOpCostWaterEfficient = getSum(OpCostWaterEfficient);
    var SumOpCostGreenery = getSum(OpCostGreenery);
    var SumOpCostPVPanels = getSum(OpCostPVPanels);
    var SumOpCostGreenhouse = getSum(OpCostGreenhouse);
    
    var CostTotal = SumOpCostBase+SumOpCostHP+SumOpCostWaterEfficient+SumOpCostGreenery+SumOpCostPVPanels+SumOpCostGreenhouse;
    
    //Sum Food Percentage
    var SumFoodPercentageBase = getSum(FoodPercentageBase);
    var SumFoodPercentageGreenhouse100 = getSum(FoodPercentageGreenhouse100);
    var FoodPercentTotal = SumFoodPercentageBase+SumFoodPercentageGreenhouse100;
    
    
    function getSum(array){
        var thisSum = 0;
        for(var i = 0; i<array.length; i++){
        thisSum += array[i];
        }
        return thisSum;
    }
    
    console.log("CO2 Total:" + CO2Total);
    console.log("Jobs Total:" + JobsTotal);
    console.log("Cost Total:" + CostTotal);
    console.log("Food Percentage:" + FoodPercentTotal);
    //console.log(SumCO2EmissionsHighPerformance);
    //console.log(SumCO2EmissionsWaterEfficient);
    //console.log(SumCO2EmissionsPVPanels);
    //console.log(SumCO2EmissionsGreenhouse);
    //console.log(data[0]);
    //console.log(data.columns[1])
    //console.log(data[0].BuildingID)
    //var neighborhood = data;
    //console.log(data);
    //console.log(data.length);
    //console.log(data[0]);
    //console.log(Object.values(data[0]));
    
    let bldg = [];
    for (i = 0; i < data.length; i++) {
        //var b = "b"+i;
        //bldg[i] = data[i];
        //console.log(bldg[i])
        //Object.values(data[i])
        bldg.push(Object.values(data[i]));
        //console.log(data[i].Occupancy);
        }
});


function BuildMap3(data,title,units){
  building_geometries = [];
    building_data = [];
    topcard.innerHTML = project[0].pname + " | " + 'Map View';

  function bldGeoArray() {
    this.type;
    this.features;
  }

  function bldGeoObj() {
    this.geometry;
    this.properties;
    this.type;
  }

  function bldGeoProp() {
    this.name;
    this.oe;
    this.oenorm;
    this.temp;
    this.ee;
    this.co;
    this.da;
    this.wa;
    this.ba;
  }

  function bldGeoData() {
    this.code;
    this.value;
  }

  building_array = new bldGeoArray();

  building_array.type = "FeatureCollection";

  for (i = 0; i < buildings.length; i++) {

    var bld = new bldGeoObj();

    bld.geometry = buildings[i].geometry;
    bld.type = "Feature";

    var bldprop = new bldGeoProp();

    bldprop.name = buildings[i].bname;
    bldprop.oe = buildings[i].oe;
    bldprop.oenorm = buildings[i].oenorm;
    bldprop.temp = buildings[i].temp;
    bldprop.ee = buildings[i].ee;
    bldprop.co = buildings[i].co;
    bldprop.da = buildings[i].da;
    bldprop.wa = buildings[i].wa;
    bldprop.ba = buildings[i].ba;

    bld.properties = bldprop;

    building_geometries.push(bld);

    var blddata = new bldGeoData();

    blddata.code = buildings[i].bname;
    blddata.value = buildings[i][data];

    building_data.push(blddata);

  }

  building_array.features = building_geometries;
  filtervalues = building_data.map(function(a) {
    return a.value;
  });

  var max_s = (project[0]["max_"+data])

  var step1_s = 0
  var step2_s = Math.round(max_s / 4)
  var step3_s = Math.round(max_s / 3)
  var step4_s = Math.round(max_s / 2)
  var step5_s = Math.round(max_s)

  $('.range-slider').jRange({
    from: 0,
    to: max_s,
    scale: [step1_s, step2_s, step3_s, step4_s, step5_s],
    isRange: true,
  });


  rangeInput = document.getElementById("rangevalue");
  rangeInput2 = document.getElementById("rangevalue").textContent;
  leftslider = document.getElementsByClassName("pointer-label low");

  rangeInput.addEventListener("change", function() {
    document.getElementById("rangevalue").textContent = rangeInput.value;
  }, false);

  rangeInput.value = "0.00," + String(max_s)


  function titleMove(e) {
        var title = this.legend.title;

        title.translate(225, 0);
    }


  // Initiate the chart
  $('#scoremap').highcharts('Map', {

    title: {
      text: ''
    },

    credits: {
      enabled: false
    },

    chart: {
      marginTop: 0,
      marginLeft: 0,
      borderWidth: 0,
      height: 400,
      events: {
        load: titleMove,
        redraw: titleMove
    	},
    },

    tooltip: {
      formatter: function() {

        var s = '<b> Name: ' + this.point.name + '</b>' + '<br/>' + '' + this.point.value.toLocaleString() + ' ' + units;
        return s;

      }
    },

    plotOptions: {
      map: {
        borderColor: "white"
      },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              n = array_bname.indexOf(this.name)
              Overview2(n)
            }
          }
        }
      }
    },

    mapNavigation: {
      enabled: true,
      x: 5,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    legend: {
    		title: {
            	text: title + ' (' + units +')',
        	},
            layout: 'horizontal',
            borderWidth: 0,
            floating: true,
            verticalAlign: 'bottom',
            align: 'right',
            fontSize: '10px',
        },

    colorAxis: {
      stops: [
        [0, '#ed1e79'],
        [0.5, '#ffbe20'],
        [1.0, '#00a99d']
      ],
      max: project[0]["max_"+data],
      min: project[0]["min_"+data],
      tickColor: "#DCDCDC"
    },


    series: [{
      data: building_data,
      mapData: building_array,
      joinBy: ['name', 'code'],
      nullColor: '#cccccc',
      states: {
        hover: {
          color: '#ffe19f'
        }
      }
    }]
  });


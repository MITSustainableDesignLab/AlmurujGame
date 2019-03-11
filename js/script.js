Highcharts.chart('neighborhoodmap', {
  chart: {
    type: 'tilemap',
    marginTop: 15,
    height: '65%'
  },

  /*title: {
    text: 'Idea map'
  },

  subtitle: {
    text: 'Hover over tiles for details'
  },*/

  colors: [
    '#fed',
    '#ffddc0',
    '#ecb',
    '#dba',
    '#c99',
    '#b88',
    '#aa7577',
    '#9f6a66'
  ],

  xAxis: {
    visible: false
  },

  yAxis: {
    visible: false
  },

  legend: {
    enabled: false
  },

  tooltip: {
    headerFormat: '',
    backgroundColor: 'rgba(247,247,247,0.95)',
    /*pointFormat: '<span style="color: {point.color}">●</span>' +
      '<span style="font-size: 13px; font-weight: bold"> {point.name}' +
      '</span><br>{point.desc}',*/
    style: {
      width: 170
    },
    padding: 10,
    hideDelay: 1000000
  },

  plotOptions: {
    series: {
      keys: ['x', 'y', 'name', 'desc'],
      tileShape: 'diamond',
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        color: '#000000',
        style: {
          textOutline: false
        }
      }
    }
  },

  series: [{
    name: ' ',
    pointPadding: 10,
    data: [
      [5, 3, '',
        'The main idea tile outlines the overall theme of the idea map.']
    ],
    color: '#7eb'
  }, {
    name: 'Steps',
    colorByPoint: true, // Pick new color for each point from colors array
    data: [
      [3, 3, ' ',
        'First step towards the main idea. Describe the starting point of the situation.'],
      [4, 3, ' ',
        'Describe where to move next in a short term time perspective.'],
      [5, 4, ' ',
        'This can be a larger milestone, after the initial steps have been taken.'],
      [6, 3, '',
        'Evaluate progress and readjust the course of the project.'],
      [7, 3, '',
        'At this point, major progress should have been made, and we should be well on our way to implementing the main idea.'],
      [6, 2, '',
        'Second evaluation and readjustment step. Implement final changes.'],
      [5, 2, '',
        'Testing and final verification step.'],
      [4, 2, '',
        'Iterate after final testing and finalize implementation of the idea.']
    ]
  }]
}, function (chart) {
  chart.tooltip.refresh(chart.series[0].points[0]); // Show tooltip of the first point on load
});
    
  
    d3.csv("buildings.csv").then(function(data){
        var Occupancy = [];
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
      
        d3.select("#toggleHP").on("click", toggleHP);
        d3.select("#toggleWater").on("click", toggleWater);
        d3.select("#toggleGreen").on("click", toggleGreen);
        d3.select("#myRange1").on("change", slider1);
        d3.select("#myRange2").on("change", slider2);
        
        var percent1 = parseInt(myRange1.value);
        var percent2 = parseInt(myRange2.value);
        var togglearray = [0,0,0,percent1/100,percent2/100];
        
    function toggleHP() {
    // Get the checkbox
      var checkHP = document.getElementById("toggleHP");
    // If the checkbox is checked, display the output text
      if (checkHP.checked == true){
      togglearray[0] = 1;
    } else {
      togglearray[0] = 0;
    }//console.log(togglearray);
  }
      
  function toggleWater() {
      var checkWater = document.getElementById("toggleWater");
      if (checkWater.checked == true){
      togglearray[1] = 1;
    } else {
      togglearray[1] = 0;
    }//console.log(togglearray);
  }
  
  function toggleGreen() {
      var checkGreen = document.getElementById("toggleGreen");
      if (checkGreen.checked == true){
      togglearray[2] = 1;
    } else {
      togglearray[2] = 0;
    }//console.log(togglearray);
  }
      
  function slider1(){
      if(myRange1 != null){
      togglearray[3]=myRange1.value/100;;
      //console.log(togglearray);
  }}   
  
  function slider2(){
      if(myRange2 != null){
      togglearray[4]=myRange2.value/100;
      //console.log(togglearray)
      }
  }
        
      //Sum CO2
      var SumOccupancy = getSum(Occupancy);
      var SumCO2EmissionsBase = getSum(CO2EmissionsBase);
      var SumCO2EmissionsHighPerformance = getSum(CO2EmissionsHighPerformance);
      var SumCO2EmissionsWaterEfficient = getSum(CO2EmissionsWaterEfficient);
      var SumCO2EmissionsGreenery = getSum(CO2EmissionsGreenery);
      var SumCO2EmissionsPVPanels = getSum(CO2EmissionsPVPanels);
      var SumCO2EmissionsGreenhouse = getSum(CO2EmissionsGreenhouse);
      
        //Sum Job
      var SumJobsBase = getSum(JobsBase);
      var SumJobsHighPerformance = getSum(JobsHighPerformance);
      var SumJobsWaterEfficient = getSum(JobsWaterEfficient);
      var SumJobsGreenery = getSum(JobsGreenery);
      var SumJobsPVPanels = getSum(JobsPVPanels);
      var SumJobsGreenhouse = getSum(JobsGreenhouse);
   
        //Sum Cost
      var SumOpCostBase = getSum(OpCostBase);
      var SumOpCostHP = getSum(OpCostHP);
      var SumOpCostWaterEfficient = getSum(OpCostWaterEfficient);
      var SumOpCostGreenery = getSum(OpCostGreenery);
      var SumOpCostPVPanels = getSum(OpCostPVPanels);
      var SumOpCostGreenhouse = getSum(OpCostGreenhouse); 
        
        //Sum Food Percentage
      var SumFoodPercentageBase = getSum(FoodPercentageBase);
      var SumFoodPercentageGreenhouse100 = getSum(FoodPercentageGreenhouse100);
      
      function getSum(array){
          var thisSum = 0;
          for(var i = 0; i<array.length; i++){
          thisSum += array[i];
          }
          return thisSum;
      }
       
        d3.select("svg#CO2")
          .append("text")
          .text("CO2 Emissions")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("svg#Cost")
          .append("text")
          .text("Cost in Dollars")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("svg#Food")
          .append("text")
          .text("Food Percentage")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("svg#Job")
          .append("text")
          .text("Jobs Created")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.selectAll(".switch,.slidecontainer").on("change", function(){
        //show the value of the sidepanel array
        /*console.log(togglearray[0]+ " "+togglearray[1]+ " "+togglearray[2]+ " "+togglearray[3]+ " "+togglearray[4]);*/
        
        //calculate CO2 Total
        var CO2Total = (SumCO2EmissionsBase+(togglearray[0]*SumCO2EmissionsHighPerformance)+(togglearray[1]*SumCO2EmissionsWaterEfficient)+(togglearray[2]*SumCO2EmissionsGreenery)+(togglearray[3]*SumCO2EmissionsPVPanels)+(togglearray[4]*SumCO2EmissionsGreenhouse)).toFixed(2);
        
        //Each time it changes create a text with the value of CO2Total... Problem: Remove old text
        
        d3.select("text#textCO2").remove();
            
        d3.select("svg#CO2")
          .append("text")
          .attr("id", "textCO2")
          .text(CO2Total)
          .attr("y", 95)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        var JobTotal = (SumJobsBase+(togglearray[0]*SumJobsHighPerformance)+(togglearray[1]*SumJobsWaterEfficient)+(togglearray[2]*SumJobsGreenery)+(togglearray[3]*SumJobsPVPanels)+(togglearray[4]*SumJobsGreenhouse)).toFixed(2);
        
        d3.select("text#textJob").remove();
            
        d3.select("svg#Job")
          .append("text")
          .attr("id", "textJob")
          .text(JobTotal)
          .attr("y", 95)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        var CostTotal = (SumOpCostBase+(togglearray[0]*SumOpCostHP)+(togglearray[1]*SumOpCostWaterEfficient)+(togglearray[2]*SumOpCostGreenery)+(togglearray[3]*SumOpCostPVPanels)+(togglearray[4]*SumOpCostGreenhouse)).toFixed(2);
            console.log(CostTotal);
        
        d3.select("text#textCost").remove();
            
        d3.select("svg#Cost")
          .append("text")
          .attr("id", "textCost")
          .text(CostTotal)
          .attr("y", 95)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        var FoodPercentTotal = (SumFoodPercentageBase+(togglearray[4]*SumFoodPercentageGreenhouse100)).toFixed(2);
            console.log(FoodPercentTotal);
        
        d3.select("text#textFood").remove();
            
        d3.select("svg#Food")
          .append("text")
          .attr("id", "textFood")
          .text(FoodPercentTotal)
          .attr("y", 95)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        })
      
      //console.log("CO2 Total:" + CO2Total);
      //console.log("Jobs Total:" + JobsTotal);
      //console.log("Cost Total:" + CostTotal);
      //console.log("Food Percentage:" + FoodPercentTotal);
        
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

//highcharts trigger elements
$(document).ready(function() {
  if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
  }

  $('.dropdown-toggle').dropdown()
});

emptyVariables()
BuildList2(example_json)
start()

function emptyVariables() {
    buildings = [];
    project = [];
    headers = [];

    array_bname = [];
    array_wwr = [];
    array_area = [];
    array_bid = [];

    array_oe = [];
    array_oe_norm = [];

    array_mo_walk = [];
    array_mo_bike = [];

    array_oc = [];

    array_da = [];

    array_lc_en = [];
    array_lc_ca = [];

    array_temp_dup = [];
    array_temp = [];
    array_temp_oe = [];
    array_temp_oe_co = [];
    array_temp_oe_he = [];
    array_temp_oe_el = [];
    array_temp_oe_eq = [];
    array_single_value_measures = [];

    array_temp_oe_norm = [];
    array_temp_oe_co_norm = [];
    array_temp_oe_he_norm = [];
    array_temp_oe_el_norm = [];
    array_temp_oe_eq_norm = [];

    series_obj = [];

    comp_level = [];
}


//highcharts options
Highcharts.setOptions({
  lang: {
    drillUpText: 'Back to Use Types'
  },
  chart: {
    style: {
      fontFamily: 'arial'
    }
  }
});

//what happens upon clicking the home button
//$(home_bt).on("click", function() {
function start() {
  $('#container').remove();
  Start_Home(0)
  $('.table-responsive').show();
  about.innerHTML = "Project Information";
  about_content.innerHTML =
    "<li>" + "Number of Buildings: " + buildings.length + "</li>" +
    "<li>" + "Number of Use Types: " + array_temp.length + "</li>" +
    "<li>" + "Area Range: " + project[0].area_min.toLocaleString() + " - " + project[0].area_max.toLocaleString() + " sqm" + "</li>"
    ToggleOffPanel();
    document.getElementById("bld_home").className = "btn btn-default active";

}

function Start_Home(index) {

  scr = new ScorecardObj();

  scr.buildings = buildings.length;
  scr.landarea = 0;
  scr.buildingarea = sum_area;
  scr.surfacearea = 0;
  scr.surfaceratio = 0;
  scr.wwraverage = Math.round((sum_wwr/ buildings.length)*100);
  scr.sitefar = 0;
  scr.usetypes = array_temp.length;
  scr.oc = sum_oc;
  scr.siteamenities = 0;
  scr.occdensity = roundToTwo(sum_oc / sum_area);
  scr.avgOE = Math.round(sum_oe_norm / array_oe_norm.length);
  scr.avgEE = Math.round(sum_lc_en / buildings.length);
  scr.totalCO = Math.round(sum_lc_ca / buildings.length);
  scr.avgDA = Math.round(sum_da / buildings.length);
  scr.avgWS = Math.round(sum_mo_wk / buildings.length);
  scr.roi = 0;


  $('#left').remove();
  $('#right').remove();
  $('#banner').remove();
  $('#header').remove();
  $('#topcard').remove();
  $('#midcard').remove();
  $('#bread').remove();
  $('#bldname').remove();
  $('panel-group').remove();
  $('menu_begin').remove();

  ToggleOffPanel();

  //replace title
  $(bread).find("li").slice(0, 4).remove();
  $(bread).append("<li>" + "<a onclick='Start_Chart1(default_index)' href='#'>Bar Chart</a>" + "</li>");
  $(bread).append("<li class='active'>" + "Energy" + "</li>");
  $('.table-responsive').show();

  //restore tabs to default
  row1.style.color = "black";
  row1.style.backgroundColor = "#f5f5f5";
  row2.style.color = "black";
  row2.style.backgroundColor = "white";
  row3.style.color = "black";
  row3.style.backgroundColor = "white";
  row4.style.color = "black";
  row4.style.backgroundColor = "white";
  row5.style.color = "black";
  row5.style.backgroundColor = "white";

  ch_t = 1
  mode = 1

  $(mode_view).button('toggle')


  //reset n
  n = null;


  sc_a = 0
  sc_b = 0


  hide('#collapseTwo', menu_2);
  hide('#collapseZero', menu_0);
  hide('#collapseFive', menu_5);
  hide('#collapseSix', menu_6);
  hide('#collapseSeven', menu_7);
  hide('#collapseEight', menu_8);
  hide('#collapseNine', menu_9);
  hide('#collapseTen', menu_10);

  //load project information
  about.innerHTML = "Project Information";
  about_content.innerHTML =
    "<li>" + "Number of Buildings: " + buildings.length + "</li>" +
    "<li>" + "Number of Use Types: " + array_temp.length + "</li>" +
    "<li>" + "Area Range: " + project[0].area_min.toLocaleString() + " - " + project[0].area_max.toLocaleString() + " sqm" + "</li>"

  $(sort).html('')
  $(yaxis0).html(' OE')

  $('.box').hide();




  //remove barchart, for WIP only
  $('#container').remove();
  $('.table-responsive').remove();
  // Change header 

  //Update Breadcrumb
  $(bread).find("li").slice(0, 4).remove();
  $(bread).append("<li>" + "<a onclick='Gohome()' href='#'>Home</a>" + "</li>");
  $(bread).append("<li class='active'>" + "Scorecard" + "</li>");
  $(bld_col_bt).className = 'btn btn-default';


  var topcard = document.createElement('div');
  topcard.className = "span12";
  $('#canvas').append(topcard);

  var banner = document.createElement('div');
  banner.className = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
  $('#canvas').append(banner);

  banner.id = "banner";

  var map = document.createElement('div');
  map.className = "col-lg-9 col-md-9 col-sm-8 col-xs-0";
  map.id = "scoremap";
  $('#banner').append(map);

  var stats = document.createElement('div');
  stats.className = "col-lg-3 col-md-3 col-sm-4 col-xs-4";
  stats.style.marginTop = "-50px";
  $('#banner').append(stats);
  stats.id = "stats";


  var radar = document.createElement('div');
  radar.className = "col-lg-3 col-md-3 col-sm-4 col-xs-4";
  radar.style.marginTop = "0px";
  radar.style.paddingTop =  "20px";
  $('#banner').append(radar);
  radar.id = "radar";

  create_geodata2();

  topcard.id = "topcard"
  topcard.innerHTML = topcard.innerHTML + project[0].pname;

  var midcard = document.createElement('div');
  midcard.className = "span12";
  $('#canvas').append(midcard);


  midcard.id = "midcard"

  var i = 1

  while (i < 7) {
    var tile = document.createElement('div');
    tile.className = "col-lg-2 col-md-2 col-sm-2 col-xs-1";
    $('#midcard').append(tile);
    tile.id = "tile"+i;
    var tile = document.getElementById("tile"+String(i));
  	tile.innerHTML = '<div class="row" id="level1" style="padding-top: 0px;"> </div><div class="row" id="level2" style="padding-top: 0px;"></div><div class="row" id="level3" align="center" style="padding-top: 0px;"></div><div class="row" id="level4" align="center" style="padding-top: 0px;"></div>'
    i++;
  }

  var tile = document.getElementById("tile"+String(i));

  
	document.getElementById("tile1").children[1].innerHTML=numberWithCommas(scr.avgOE);
	document.getElementById("tile1").children[2].innerHTML="kWh/m2";
	document.getElementById("tile1").children[3].innerHTML="OPERATION<br>ENERGY";
	document.getElementById("tile1").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightOE()' onmouseout='OffOE()' onclick='PressOE()' src='img/OE2.png' id='oebbutton' border=0/></a>";

	document.getElementById("tile2").children[1].innerHTML=numberWithCommas(scr.avgEE);
  document.getElementById("tile2").children[2].innerHTML="kWh/m2";
  document.getElementById("tile2").children[3].innerHTML="EMBODIED<br>ENERGY(50y)";
  document.getElementById("tile2").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightEE()' onmouseout='OffEE()' onclick='PressEE()' src='img/EE2.png' id='eebbutton' border=0/></a>";

 	document.getElementById("tile3").children[1].innerHTML=numberWithCommas(scr.totalCO);
  document.getElementById("tile3").children[2].innerHTML="kgCO2/m2";
  document.getElementById("tile3").children[3].innerHTML="BUILDING GHG<br>EMISSIONS(50y)";
  document.getElementById("tile3").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightCO()' onmouseout='OffCO()' onclick='PressCO()' src='img/BE2.png' id='bebbutton' border=0/></a>";
	
  document.getElementById("tile4").children[1].innerHTML=scr.avgDA;
	document.getElementById("tile4").children[2].innerHTML="% DA";
	document.getElementById("tile4").children[3].innerHTML="DAYLIGHT<br>AREA";
	document.getElementById("tile4").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightDA()' onmouseout='OffDA()' onclick='PressDA()' src='img/DA2.png' id='dabbutton' border=0/></a>";

	document.getElementById("tile5").children[1].innerHTML=scr.avgWS;
	document.getElementById("tile5").children[2].innerHTML="% WS";
	document.getElementById("tile5").children[3].innerHTML="WALKABILITY<br>SCORE";
	document.getElementById("tile5").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightWA()' onmouseout='OffWA()' onclick='PressWA()' src='img/WA2.png' id='wabbutton' border=0/></a>";


  document.getElementById("tile6").children[1].innerHTML=scr.roi;
  document.getElementById("tile6").children[2].innerHTML="% ROI";
  document.getElementById("tile6").children[3].innerHTML="FINANCIAL<br>RETURN";
  document.getElementById("tile6").children[0].innerHTML="<a href='#'><img style='height: 70%; width: 70%; object-fit: contain' onmouseover='LightFR()' onmouseout='OffFR()' onclick='PressFR()' src='img/FR2.png' id='frbbutton' border=0/></a>";




  var table = '';
  table += '<tr><td class="statrow" id="statrow" width="70%">Number of Buildings</td><td class="statv" id="statv" width="30%">'+ numberWithCommas(scr.buildings) + '</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="70%">Land Area (ha)</td><td class="statv" id="statv" width="30%">' + numberWithCommas(scr.landarea) + '</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="70%">Surface Area (m2)</td><td class="statv" id="statv" width="40%">' + numberWithCommas(scr.surfacearea) + '</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="70%">Surface/Floor Ratio</td><td class="statv" id="statv" width="40%">'+ numberWithCommas(scr.surfaceratio) +'</td></tr>';
  table += '<tr><td class="statrow" id="statrow" width="70%">Use Types</td><td class="statv" id="statv" width="30%">'+ scr.usetypes +'</td></tr>';
  table += '<tr><td class="statrow" id="statrow" width="70%">Average WWR %</td><td class="statv" id="statv" width="30%">'+ scr.wwraverage + '%'+'</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="70%">Site FAR</td><td class="statv" id="statv" width="30%">'+ scr.sitefar +'</td></tr>';
  table += '<tr><td class="statrow" id="statrow" width="70%">Total Occupants</td><td class="statv" id="statv" width="30%">'+ numberWithCommas(scr.oc) +'</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="70%">Site Amenities</td><td class="statv" id="statv" width="30%">'+ scr.siteamenities +'</td></tr>';
  table += '<tr><td class="statrow" id="statrow" width="70%">Occupant Density</td><td class="statv" id="statv" width="30%">'+ scr.occdensity +'</td></tr>';
  table += '<tr><td class="statrow" id="statrow" width="70%">Building Area (sqm)</td><td class="statv" id="statv" width="40%">' + numberWithCommas(scr.buildingarea)+'</td></tr>';
  //table += '<tr><td class="statrow" id="statrow" width="30%">Area Range</td><td class="statv" id="statv" width="70%">' + project[0].area_min.toLocaleString() + " - " + numberWithCommas(project[0].area_max.toLocaleString()) + " sqm" + '</td></tr>';


  stats.innerHTML = '<h3>Site Data</h3><table id="stattable">' + table + '</table>';
  $('#stattable').fadeIn(1500);
  $('#header').fadeIn(500);
  $('#topcard').fadeIn(500);

  var unitDisplay = document.createElement('div');
  banner.appendChild(unitDisplay);

  BuildMap2();

}
//
//declaring a header object
function headerObj() {
  this.display_name
  this.hname;
  this.htype;
  this.hvalue;
  this.unit;
  this.range;
  //single value variables
  this.description
  this.levels
  this.nlevels
    //time series variables
  this.nCatogeries
  this.catogeries_display_name
  this.catogeries
  this.time_step
}

//declaring scorecard object
function ScorecardObj() {
  this.buildings;
  this.landarea;
  this.buildingarea;
  this.surfacearea;
  this.surfaceratio;
  this.wwraverage;
  this.sitefar;
  this.usetypes;
  this.residents;
  this.workers;
  this.siteamenities;
  this.occdensity;
  this.avgOE;
  this.avgEE;
  this.totalCO;
  this.avgDA;
  this.avgWS;
  this.roi;
}

function OEDataObj() {
  this.name;
  this.data;
  this.dataname;
}


//declaring bldDataObj
function bldDataObj() {

  this.bid;
  this.bname;
  this.area;
  this.coordinates;

  this.wwr;

  this.wwr_n;
  this.wwr_s;
  this.wwr_w;
  this.wwr_e;

  this.temp;
  this.utype;

  this.oe;
  this.ee;
  this.co;
  this.da;
  this.wa;
  this.oe_norm;
  this.oe_eq;
  this.oe_eq_norm;
  this.oe_el;
  this.oe_el_norm;
  this.oe_he;
  this.oe_he_norm;
  this.oe_co;
  this.oe_co_norm;

  // that is later instantiated as an array in BuildList2() and the size of this array will be determined by
  // the size of the header in the JSON 

  this.single_value_measure
  this.time_series_measure
  this.time_series_measure_sum
  this.time_series_measure_sum_categories
}

//declaring prDataObj
function prDataObj() {

  this.pname;
  this.plocation;


  // using arrays of single value measures instead - Size of these arrays depned on the header
  this.avg_single_value_measures
  this.max_single_value_measures
  this.min_single_value_measures
}

//declaration of functions
function roundToOne(num) {
  return +(Math.round(num + "e+1") + "e-1");
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function BuildMap2(data,title,units){
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
    this.color;
  }

 	function tempkey() {
    this.tempname;
    this.color;
  }

  colorlist = ['#4d8eff','#f04591','#fdc22e','#25b5ab','#8c8c8c','#8085e9','#dd87dd']
  building_array = new bldGeoArray();

  building_array.type = "FeatureCollection";

  templist2 = [];

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
	}


  for (i = 0; i < buildings.length; i++) {
  	templist2.push(buildings[i].temp);
  	}

  uniqueTempList = templist2.filter(onlyUnique);
  tempdic = []

  for (i=0; i < uniqueTempList.length; i++){
  	var entry = new tempkey();
  		entry.name = uniqueTempList[i];
  		entry.color = colorlist[i];
  	tempdic.push(entry);
  }

	function getByValue(arr, value) {

  	for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].name == value) return arr[i].color;
  }
	}


  templist = [];
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
    
    templist.push(buildings[i][data])
    blddata.color = getByValue(tempdic,buildings[i].temp);


    building_data.push(blddata);

  }

  building_array.features = building_geometries;




building_array = new bldGeoArray();

building_array.type = "FeatureCollection";

building_geometries = [];
building_data = [];
HomeData =[];

 for (j = 0; j < tempdic.length; j++) {
 	building_geometries = [];
	building_data = [];
 	var b = new homeMapObj
 	b.name = tempdic[j].name;
 	b.joinBy = ['name', 'code'];
 	b.nullColor = '#cccccc';
 	b.states = {hover: {color: '#ffe19f'}};
 	 for (i = 0; i < buildings.length; i++) {
 	 	if (buildings[i].temp == tempdic[j].name){
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

 	 		    building_array = new bldGeoArray();
 	 		    building_array.type = "FeatureCollection";
 	 		    building_geometries.push(bld);
 	 		    building_array.features = building_geometries;
 	 		    b.mapData = building_array; 

 	 		    var blddata = new bldGeoData();
 	 		    blddata.code = buildings[i].bname;
 	 		    blddata.value = buildings[i][data];
 	 		    blddata.color = getByValue(tempdic[j],buildings[i].temp);
 	 		    building_data.push(blddata);
 	 		}
 	 	}
 	b.data = building_data;
 	b.mapData = building_array; 
 	HomeData.push(b);
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
    },

    plotOptions: {
      map: {
        borderColor: "white",
        showInLegend: true
      },
    },

    mapNavigation: {
      enabled: false,
      x: 5,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    legend: {
    		title:{
    			text: "Use Types",
    			style: {
    				"fontWeight":"bold",
    				"font-size":"20px"
    			}
    		},
            layout: 'vertical',
            borderWidth: 0,
            floating: true,
            verticalAlign: 'top',
            align: 'left',
            fontSize: '10px',
        },

    series: HomeData
  });
}


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
}

// parsing JSON dynamically
function BuildList2(data) {

  for (i = 0; i < data.header.length; i++) {

    var head = new headerObj();
    head.display_name = data.header[i].display_name;
    head.hname = data.header[i].name;
    head.htype = data.header[i].type;
    if (head.htype == "time_series")
      default_index = i;
    head.unit = data.header[i].unit;
    head.range = data.header[i].range;
    //------------------------------------------------
    head.description = data.header[i].description;
    head.levels = data.header[i].levels;
    head.nlevels = data.header[i].nlevels;
    //------------------------------------------------
    head.nCatogeries = data.header[i].nCatogeries
    head.catogeries_display_name = data.header[i].catogeries_display_name
    head.catogeries = data.header[i].catogeries
    head.time_step = data.header[i].values_in_categories
    //Gloabal OBJ
    headers.push(head);
    array_single_value_measures[i] = [];
  }


  for (i = 0; i < data.features.length; i++) {

    var bld = new bldDataObj();

    bld.bid = data.features[i].id;

    // CHECK FOR ERRORS         
    // If floor area doesn't exist OR no energy data exists,
    // skip this building & continue with loop
    if (data.features[i].properties.GrossFloorArea === undefined ||
      (!(data.features[i].properties.OEEquipment ||
        data.features[i].properties.OELighting ||
        data.features[i].properties.OEHeating ||
        data.features[i].properties.OECooling))) {
      continue;
    }

    // Check if building has name (else assign dummy name)
    if (data.features[i].properties.Name === undefined) {
      bld.bname = "Bldg_" + i;
    } else {
      bld.bname = data.features[i].properties.Name;
    }

    // Round area to whole number 
    bld.area = Math.round(data.features[i].properties.GrossFloorArea);

    bld.wwr_n = data.features[i].properties.WwrN;
    bld.wwr_s = data.features[i].properties.WwrS;
    bld.wwr_e = data.features[i].properties.WwrE;
    bld.wwr_w = data.features[i].properties.WwrW;

    bld.wwr = roundToOne((bld.wwr_n + bld.wwr_s + bld.wwr_e + bld.wwr_w) / 4);

    bld.geometry = data.features[i].geometry;

    bld.temp = data.features[i].properties.UseType;
    bld.temp_name = data.features[i].properties.TemplateName;

    bld.oc = data.features[i].properties.Occupancy;

    bld.oe_eq = [];
    bld.oe_el = [];
    bld.oe_he = [];
    bld.oe_co = [];
    bld.oe = [];
    bld.ee = data.features[i].properties.LCEnergy;
    bld.co = data.features[i].properties.LCCarbon;
    bld.da = data.features[i].properties.DaylitArea;
    bld.wa = data.features[i].properties.MOWalkability;
    bld.ba = data.features[i].properties.MOWalkability;

    

    for (j = 0; j < 12; j++) {

      bld.oe_eq.push(Math.round(data.features[i].properties.OEEquipment[j]));
      bld.oe_el.push(Math.round(data.features[i].properties.OELighting[j]));
      bld.oe_he.push(Math.round(data.features[i].properties.OEHeating[j]));
      bld.oe_co.push(Math.round(data.features[i].properties.OECooling[j]));
      bld.oe.push(Math.round(data.features[i].properties.OETotal[j]));
    }

    bld.oe = bld.oe.reduce((a, b) => a + b, 0);


    //This array has a single number for each of the performance measures
    // For single value measures (e.g. Walkability): The single number is the value in this performance measure
    // For Time Series measures (e.g. Energy): The single number is the gross sum for sub-values in the time series across time steps (Monthly...) and categories (Cooling...)
    bld.single_value_measure = [];

    // The following three arrays are used only for Time Series measures
    bld.time_series_measure = [];
    bld.time_series_measure_sum = [];
    bld.time_series_measure_sum_categories = [];
    for (j = 0; j < headers.length; j++) {

      // Defining Performance Measues of Time Series Type Dynamically Here
      if (headers[j].htype == "time_series") {
        bld.time_series_measure[j] = [];
        bld.time_series_measure_sum[j] = 0
        bld.time_series_measure_sum_categories[j] = [];
        for (ii = 0; ii < headers[j].nCatogeries; ii++) {
          bld.time_series_measure[j][ii] = [];
          bld.time_series_measure_sum_categories[j][ii] = 0;
        }
        for (ii = 0; ii < headers[j].nCatogeries; ii++) {
          for (k = 0; k < headers[j].time_step; k++) {
            bld.time_series_measure[j][ii].push(Math.round(data.features[i].properties[headers[j].catogeries[ii]][k]));
            bld.time_series_measure_sum_categories[j][ii] += bld.time_series_measure[j][ii][k]
          }
        }
        for (ii = 0; ii < headers[j].nCatogeries; ii++) {
          bld.time_series_measure_sum[j] += bld.time_series_measure_sum_categories[j][ii]
        }
        bld.single_value_measure.push(bld.time_series_measure_sum[j])
      }

      // Defining Performance Measures of Single Value Type Dynamically Here
      else {
        if (headers[j].hname == "LCEnergy" || headers[j].hname == "LCCarbon")
          bld.single_value_measure.push(Math.round(data.features[i].properties[headers[j].hname] / data.features[i].properties.LCLength) || null)
        else
          bld.single_value_measure.push(data.features[i].properties[headers[j].hname] || null)
      }
    }



    foo = bld.time_series_measure_sum_categories

    // set missing values to NULL instead of UNDEFINED, otherwise Highcharts messes up spider chart
    bld.mo_walk = data.features[i].properties.MOWalkability || null;
    bld.mo_bike = data.features[i].properties.MOBikeability || null;
    bld.da = (data.features[i].properties.DaylitArea*100) || null;

    //------------------- Dynamic--------------------
    // CAUTION: Life Cycle is devided by Life Cycle Length overhere!
    // Embodied Energy and Carbon is already in kWh
    bld.lc_en = Math.round(data.features[i].properties.LCEnergy) || null;
    bld.lc_ca = Math.round(data.features[i].properties.LCCarbon) || null;

    //bld.oe = 0;
    bld.oe_co_all = 0;
    bld.oe_he_all = 0;
    bld.oe_el_all = 0;
    bld.oe_eq_all = 0;


    for (j = 0; j < 12; j++) {

      bld.oe_co_all += Math.round(bld.oe_co[j]);
      bld.oe_he_all += Math.round(bld.oe_he[j]);
      bld.oe_el_all += Math.round(bld.oe_el[j]);
      bld.oe_eq_all += Math.round(bld.oe_eq[j]);
    }

    bld.oe_co_norm = [];
    bld.oe_he_norm = [];
    bld.oe_el_norm = [];
    bld.oe_eq_norm = [];

    bld.oe_norm = Math.round(bld.oe / bld.area);


    for (j = 0; j < 12; j++) {

      var oe_co_norm_temp = roundToOne(bld.oe_co[j] / bld.area);
      var oe_he_norm_temp = roundToOne(bld.oe_he[j] / bld.area);
      var oe_el_norm_temp = roundToOne(bld.oe_el[j] / bld.area);
      var oe_eq_norm_temp = roundToOne(bld.oe_eq[j] / bld.area);

      bld.oe_co_norm.push(oe_co_norm_temp);
      bld.oe_he_norm.push(oe_he_norm_temp);
      bld.oe_el_norm.push(oe_el_norm_temp);
      bld.oe_eq_norm.push(oe_eq_norm_temp);
    }
    //Gloabal OBJ
    buildings.push(bld);
  }


  for (i = 0; i < buildings.length; i++) {
    array_bname.push(buildings[i].bname);

    array_wwr.push(buildings[i].wwr);
    array_area.push(buildings[i].area);

    array_bid.push(buildings[i].bid);

    array_oe.push(buildings[i].oe);
    array_ee.push(buildings[i].ee);
    array_co.push(buildings[i].co);
    array_wa.push(buildings[i].wa);
    array_ba.push(buildings[i].ba);
    array_oe_norm.push(roundToOne(buildings[i].oe / buildings[i].area));

    //--------------- Dynamic ------------------
    for (j = 0; j < headers.length; j++) {
      array_single_value_measures[j].push(buildings[i].single_value_measure[j])
    }
    //---------------------------------------
    array_mo_walk.push(buildings[i].mo_walk);
    array_mo_bike.push(buildings[i].mo_bike);
    array_oc.push(buildings[i].oc);
    array_da.push(buildings[i].da);
    array_lc_en.push(buildings[i].lc_en);
    array_lc_ca.push(buildings[i].lc_ca);
    //---------------------------------------

    array_temp_dup.push(buildings[i].temp);

  }

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp) === -1) array_temp.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe) === -1) array_temp_oe.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_co) === -1) array_temp_oe_co.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_he) === -1) array_temp_oe_he.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_el) === -1) array_temp_oe_el.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_eq) === -1) array_temp_oe_eq.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_norm) === -1) array_temp_oe_norm.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_co_norm) === -1) array_temp_oe_co_norm.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_he_norm) === -1) array_temp_oe_he_norm.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_el_norm) === -1) array_temp_oe_el_norm.push(el);
  });

  $.each(array_temp_dup, function(i, el) {
    if ($.inArray(el, array_temp_oe_eq_norm) === -1) array_temp_oe_eq_norm.push(el);
  });


  //Energy by template
  for (j = 0; j < array_temp_oe.length; j++) {

    array_temp_oe[j] = [array_temp_oe[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe[j][0]) {

        array_temp_oe[j].push(buildings[i].oe);
      }
    }
  }

  //Cooling energy by template
  for (j = 0; j < array_temp_oe_co.length; j++) {

    array_temp_oe_co[j] = [array_temp_oe_co[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_co[j][0]) {

        array_temp_oe_co[j].push(buildings[i].oe_co);
      }
    }
  }

  //Heating energy by template
  for (j = 0; j < array_temp_oe_he.length; j++) {

    array_temp_oe_he[j] = [array_temp_oe_he[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_he[j][0]) {

        array_temp_oe_he[j].push(buildings[i].oe_he);
      }
    }
  }

  //Electric lighting energy by template
  for (j = 0; j < array_temp_oe_el.length; j++) {

    array_temp_oe_el[j] = [array_temp_oe_el[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_el[j][0]) {

        array_temp_oe_el[j].push(buildings[i].oe_el);
      }
    }
  }

  //Equipment energy by template
  for (j = 0; j < array_temp_oe_eq.length; j++) {

    array_temp_oe_eq[j] = [array_temp_oe_eq[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_eq[j][0]) {

        array_temp_oe_eq[j].push(buildings[i].oe_eq);
      }
    }
  }

  //Normalized energy by template
  for (j = 0; j < array_temp_oe_norm.length; j++) {

    array_temp_oe_norm[j] = [array_temp_oe_norm[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_norm[j][0]) {

        array_temp_oe_norm[j].push(buildings[i].oe_norm);
      }
    }
  }

  //Normalized cooling energy by template
  for (j = 0; j < array_temp_oe_co_norm.length; j++) {

    array_temp_oe_co_norm[j] = [array_temp_oe_co_norm[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_co_norm[j][0]) {

        array_temp_oe_co_norm[j].push(buildings[i].oe_co_norm);
      }
    }
  }

  //Normalized energy by template
  for (j = 0; j < array_temp_oe_he_norm.length; j++) {

    array_temp_oe_he_norm[j] = [array_temp_oe_he_norm[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_he_norm[j][0]) {

        array_temp_oe_he_norm[j].push(buildings[i].oe_he_norm);
      }
    }
  }

  //Normalized energy by template
  for (j = 0; j < array_temp_oe_el_norm.length; j++) {

    array_temp_oe_el_norm[j] = [array_temp_oe_el_norm[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_el_norm[j][0]) {

        array_temp_oe_el_norm[j].push(buildings[i].oe_el_norm);
      }
    }
  }

  //Normalized energy by template
  for (j = 0; j < array_temp_oe_eq_norm.length; j++) {

    array_temp_oe_eq_norm[j] = [array_temp_oe_eq_norm[j]];

    for (i = 0; i < buildings.length; i++) {

      if (buildings[i].temp == array_temp_oe_eq_norm[j][0]) {

        array_temp_oe_eq_norm[j].push(buildings[i].oe_eq_norm);
      }
    }
  }


  //template max and avg by building
  for (i = 0; i < buildings.length; i++) {

    buildings[i].temp_max = null;
    buildings[i].temp_avg = null;

    for (j = 0; j < array_temp_oe.length; j++) {

      if (buildings[i].temp == array_temp_oe[j][0]) {

        buildings[i].temp_max = MaxArray(array_temp_oe[j].slice(1));
        buildings[i].temp_avg = Math.round(((array_temp_oe[j].slice(1)).reduce(function(a, b) {
          return a + b
        })) / (array_temp_oe[j].slice(1)).length)
      }
    }
  };


  sum_oe = array_oe.reduce(function(a, b) {
    return a + b
  });
  var avg_oe = Math.round(sum_oe / array_oe.length);
  var max_oe = MaxArray(array_oe);
  var min_oe = MinArray(array_oe);

  sum_area = array_area.reduce(function(a, b) {
    return a + b
  });
  var avg_area = Math.round(sum_area / array_area.length);
  var max_area = MaxArray(array_area);
  var min_area = MinArray(array_area);

  sum_wwr = array_wwr.reduce(function(a, b) {
    return a + b
  });
  var avg_wwr = Math.round(sum_wwr / array_wwr.length);
  var max_wwr = MaxArray(array_wwr);
  var min_wwr = MinArray(array_wwr);

  sum_oe_norm = array_oe_norm.reduce(function(a, b) {
    return a + b
  });
  var avg_oe_norm = roundToOne(sum_oe_norm / array_oe_norm.length);
  var max_oe_norm = MaxArray(array_oe_norm);
  var min_oe_norm = MinArray(array_oe_norm);

  
  sum_ee = array_ee.reduce(function(a, b) {
    return a + b
  });
  var avg_ee = roundToOne(sum_oe / array_oe.length);
  var max_ee = MaxArray(array_ee);
  var min_ee = MinArray(array_ee);

    sum_co = array_co.reduce(function(a, b) {
    return a + b
  });
  var avg_co = roundToOne(sum_co / array_co.length);
  var max_co = MaxArray(array_co);
  var min_co = MinArray(array_co);
    
    sum_da = array_da.reduce(function(a, b) {
    return a + b
  });
  avg_da = sum_da / array_da.length;
  var max_da = MaxArray(array_da);
  var min_da = MinArray(array_da);
    
    sum_wa = array_wa.reduce(function(a, b) {
    return a + b
  });
  var avg_wa = roundToOne(sum_wa / array_wa.length);
  var max_wa = MaxArray(array_wa);
  var min_wa = MinArray(array_wa);
    

    sum_ba = array_ba.reduce(function(a, b) {
    return a + b
  });
  var avg_ba = roundToOne(sum_ba / array_ba.length);
  var max_ba = MaxArray(array_ba);
  var min_ba = MinArray(array_ba);



  //------------------ Dynamic ----------------------
  var sum_single_value_measures = [];
  var avg_single_value_measures = [];
  var max_single_value_measures = [];
  var min_single_value_measures = [];

  for (j = 0; j < headers.length; j++) {
    sum_single_value_measures[j] = array_single_value_measures[j].reduce(function(a, b) {
      return a + b
    });
    avg_single_value_measures[j] = Math.round(sum_single_value_measures[j] / array_single_value_measures[j].length);
    max_single_value_measures[j] = Math.round(MaxArray(array_single_value_measures[j]));
    min_single_value_measures[j] = Math.round(MinArray(array_single_value_measures[j]));
  }
  //-----------------------------------------------

  sum_mo_wk = array_mo_walk.reduce(function(a, b) {
    return a + b
  });
  avg_mo_wk = Math.round(sum_mo_wk / array_mo_walk.length);
  var max_mo_wk = MaxArray(array_mo_walk);
  var min_mo_wk = MinArray(array_mo_walk);

  var sum_mo_bk = array_mo_bike.reduce(function(a, b) {
    return a + b
  });
  var avg_mo_bk = Math.round(sum_mo_bk / array_mo_bike.length);
  var max_mo_bk = MaxArray(array_mo_bike);
  var min_mo_bk = MinArray(array_mo_bike);

  sum_oc = array_oc.reduce(function(a, b) {
    return a + b
  });
  var avg_oc = Math.round(sum_oc / array_oc.length);
  var max_oc = MaxArray(array_oc);
  var min_oc = MinArray(array_oc);

  sum_da = array_da.reduce(function(a, b) {
    return a + b
  });
  avg_da = Math.round(sum_da / array_da.length);
  var max_da = MaxArray(array_da);
  var min_da = MinArray(array_da);

  sum_lc_en = array_lc_en.reduce(function(a, b) {
    return a + b
  });
  var avg_lc_en = Math.round(sum_lc_en / array_lc_en.length);
  var max_lc_en = MaxArray(array_lc_en);
  var min_lc_en = MinArray(array_lc_en);

  sum_lc_ca = array_lc_ca.reduce(function(a, b) {
    return a + b
  });
  var avg_lc_ca = Math.round(sum_lc_ca / array_lc_ca.length);
  var max_lc_ca = MaxArray(array_lc_ca);
  var min_lc_ca = MinArray(array_lc_ca);
  //---------------------------------------------------------------------------------

  var prj = new prDataObj();

  prj.pname = data.projectName;
  prj.plocation = data.epwLocation;

  prj.bool_oe = data.metrics.OE;
  prj.bool_mo = data.metrics.MO;
  prj.bool_da = data.metrics.DA;
  prj.bool_lc = data.metrics.LC;

  prj.area_max = max_area;
  prj.area_min = min_area;

  prj.wwr_max = max_wwr;
  prj.wwr_min = min_wwr;

  prj.avg_oe = avg_oe;
  prj.avg_oe_norm = avg_oe_norm;

  //----------- Dynamic -------------------
  prj.avg_single_value_measures = [];
  prj.max_single_value_measures = [];
  prj.min_single_value_measures = [];

  for (j = 0; j < headers.length; j++) {
    prj.avg_single_value_measures[j] = avg_single_value_measures[j];
    prj.max_single_value_measures[j] = max_single_value_measures[j];
    prj.min_single_value_measures[j] = min_single_value_measures[j];
  }
  //-------------------------------------
  prj.avg_mo_wk = avg_mo_wk;
  prj.avg_mo_bk = avg_mo_bk;
  prj.avg_oc = avg_oc;
  prj.avg_da = avg_da;
  prj.avg_lc_en = avg_lc_en;
  prj.avg_lc_ca = avg_lc_ca;

  prj.max_oe = max_oe;
  prj.max_oe_norm = max_oe_norm;
  prj.max_mo_wk = max_mo_wk;
  prj.max_mo_bk = max_mo_bk;
  prj.max_oc = max_oc;
  prj.max_da = max_da;
  prj.max_lc_en = max_lc_en;
  prj.max_lc_ca = max_lc_ca;

  prj.min_oe = min_oe;
  prj.min_oe_norm = min_oe_norm;
  prj.min_mo_wk = min_mo_wk;
  prj.min_mo_bk = min_mo_bk;
  prj.min_oc = min_oc;
  prj.min_da = min_da;
  prj.min_lc_en = min_lc_en;
  prj.min_lc_ca = min_lc_ca;

  project.push(prj);

  Start_Home(default_index);
  // remove loading div
  listReady();


  // });
}


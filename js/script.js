//highcharts trigger elements
$(document).ready(function() {
  if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
  }

  $('.dropdown-toggle').dropdown()
});
start()

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
  Start_Home(default_index)
  $('.table-responsive').show();
  about.innerHTML = "Project Information";
  about_content.innerHTML =
    "<li>" + "Number of Buildings: " + buildings.length + "</li>" +
    "<li>" + "Number of Use Types: " + array_temp.length + "</li>" +
    "<li>" + "Area Range: " + project[0].area_min.toLocaleString() + " - " + project[0].area_max.toLocaleString() + " sqm" + "</li>"
    ToggleOffPanel();
    document.getElementById("bld_home").className = "btn btn-default active";

}


var togglearray = [0,0,0,myRange1.value/100,myRange2.value/100];
var container = $('#container'),

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


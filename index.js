// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {
  //center: [0, 0],
  crs: L.CRS.Simple,
  //maxBounds: [[-2000, -2000], [2000, 2000]],
  minZoom: -2 //zoom: -1,
}).setView([0,0], -2);

bounds = [[-2000, -2000], [2000, 2000]];
map.fitBounds(bounds);

function onClick(e) {
  // e = event
  var id = e.target.feature.id
  console.log(id);
  // You can make your ajax call declaration here
  //$.ajax(... 
}

function onEachFeature(feature, layer) {
    //bind click
    layer.on({
        click: onClick
    });
}

all = commercial["features"].concat(residential["features"]);

for (var i in all) {
  var building = all[i];
  var b = new L.GeoJSON(building, {
    onEachFeature: onEachFeature,
    style: {
      color: '#228B22',
      opacity: 0.7
    } 
  }).addTo(map);
  b.addTo(map);
}

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
	  }
	}
	    
	function toggleWater() {
	    var checkWater = document.getElementById("toggleWater");
	    if (checkWater.checked == true){
	    togglearray[1] = 1;
	  } else {
	    togglearray[1] = 0;
	  }
	}
	
	function toggleGreen() {
	    var checkGreen = document.getElementById("toggleGreen");
	    if (checkGreen.checked == true){
	    togglearray[2] = 1;
	  } else {
	    togglearray[2] = 0;
	  }
	}
	    
	function slider1(){
	    if(myRange1 != null){
	    togglearray[3]= myRange1.value/100;
	}}   
	
	function slider2(){
	    if(myRange2 != null){
	    togglearray[4]=myRange2.value/100;
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
       
        d3.select("CO2")
          .append("text")
          .text("CO2 Emissions")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("Cost")
          .append("text")
          .text("Cost in Dollars")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("Food")
          .append("text")
          .text("Food Percentage")
          .attr("y", 70)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 12)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        d3.select("Job")
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
        console.log(togglearray[0]+ " "+togglearray[1]+ " "+togglearray[2]+ " "+togglearray[3]+ " "+togglearray[4]);
        //calculate CO2 Total
        var CO2Total = (SumCO2EmissionsBase+(togglearray[0]*SumCO2EmissionsHighPerformance)+(togglearray[1]*SumCO2EmissionsWaterEfficient)+(togglearray[2]*SumCO2EmissionsGreenery)+(togglearray[3]*SumCO2EmissionsPVPanels)+(togglearray[4]*SumCO2EmissionsGreenhouse)).toFixed(2);
        
        d3.select("text#textCO2").remove();
            
        d3.select("svg#CO2")
          .append("text")
          .attr("id", "textCO2")
          .text(CO2Total)
          .attr("y", 15)
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
          .attr("y", 15)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        var CostTotal = (SumOpCostBase+(togglearray[0]*SumOpCostHP)+(togglearray[1]*SumOpCostWaterEfficient)+(togglearray[2]*SumOpCostGreenery)+(togglearray[3]*SumOpCostPVPanels)+(togglearray[4]*SumOpCostGreenhouse)).toFixed(2);
            
        
        d3.select("text#textCost").remove();
            
        d3.select("svg#Cost")
          .append("text")
          .attr("id", "textCost")
          .text(CostTotal)
          .attr("y", 15)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        
        var FoodPercentTotal = (SumFoodPercentageBase+(togglearray[4]*SumFoodPercentageGreenhouse100)).toFixed(2);

        
        d3.select("text#textFood").remove();
            
        d3.select("svg#Food")
          .append("text")
          .attr("id", "textFood")
          .text(FoodPercentTotal)
          .attr("y", 15)
          .attr("x", 50)
          .attr("text-anchor","middle")
          .attr("font-size", 16)
          .attr("font-family", "sans-serif")
          .attr("fill", "black");
        })

	    
	    let bldg = [];
	    for (i = 0; i < data.length; i++) {
	        bldg.push(Object.values(data[i]));
	        }
	});
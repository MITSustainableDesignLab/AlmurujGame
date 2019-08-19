/********************************************
 * settings.js
 ********************************************/

 function populate(selected_buildings) { // populate the bottom row with correct values
   var values = calculate(selected_buildings);
   document.getElementById("capex").innerHTML = numberWithCommas(Math.round(values.capex/1000)); // in millions
   document.getElementById("co2val").innerHTML = numberWithCommas(Math.round(values.co2/1000)); // kg to tons
   document.getElementById("waterval").innerHTML = numberWithCommas(Math.round(values.water/1000)); // liters to m^3
   document.getElementById("jobsval").innerHTML = numberWithCommas(Math.round(values.jobs));
   document.getElementById("opexval").innerHTML = numberWithCommas(Math.round(values.opex/1000)); // in millions
   document.getElementById("energyval").innerHTML = numberWithCommas(Math.round(values.energy/1000000)); // kWH to gWH
   document.getElementById("foodval").innerHTML = numberWithCommas(Math.round(values.food));
 }

// takes a calculation function
// returns an object with the relevant calculated value for all buildings
 function normalize(calc_func) {
   var numbers = {}; // keeps the calculated results of each building
   for (var i in all) {
     var ls = [all[i].id]; // FIX: gets the id of each building (hardcoded for all?)
     // returns the actual CO2 Emissions or 0
     var calculated = calc_func(ls, 0) || 0;
     // adds the calculated result to the building's value
     numbers[all[i].id] = +calculated;
   }

   var not_zero = false; // ??? what is this variable for
   // FIX: hardcoded large emitter building for Riyadh dataset
   if (numbers['316f1a4c-d98a-430f-b4ec-7f5a0d5e3b21'] > 0) {
     not_zero = true;
   };

   // creates a scale from 0 to 1 of each building's calculated result (energy, water or otherwise)
   // get min and subtract out min from each value
   min_val = Math.min.apply(null, Object.values(numbers));
   for (var id in numbers) {
     numbers[id] -= min_val;
   }
   // FIX: setting large building's val to 0? so that it doesn't become the max
   numbers['316f1a4c-d98a-430f-b4ec-7f5a0d5e3b21'] = 0;
   // get max and divide each value by it
   max_val = Math.max.apply(null, Object.values(numbers));
   if (max_val > 0) {
     for (var id in numbers) {
       numbers[id] /= max_val;
     }
   }
   // FIX: set large emitter building value to one, artificially
   if (not_zero) {
     numbers['316f1a4c-d98a-430f-b4ec-7f5a0d5e3b21'] = 1;
   }
   return numbers;
 }

 /* Takes a normalized calculated result value
  * Returns an rgb value as a string
  * Maps from orange (244, 190, 66) to red (244, 40, 66)
  */
 function heatMapColorforValue(value) {
   var a=(1-value);
   var Y=Math.floor(200*a);
   r=244;g=Y;b=66;
   var str = rgbToHex(r, g, b);
   return str;
 }

/* Takes a calculation function
 * Sets the appropriate heatmap color for all buildings in the map
 */
 function heat(calc_func) {
   normalized = normalize(calc_func); // normalized calculated values
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

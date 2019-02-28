// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {
  //center: [0, 0],
  crs: L.CRS.Simple,
  //maxBounds: [[-2000, -2000], [2000, 2000]],
  minZoom: -2 //zoom: -1,
}).setView([0,0], -2);

bounds = [[-2000, -2000], [2000, 2000]];
map.fitBounds(bounds);
function whenClicked(e) {
  // e = event
  console.log(e);
  // You can make your ajax call declaration here
  //$.ajax(... 
}

function onEachFeature(feature, layer) {
    //bind click
    layer.on({
        click: whenClicked
    });
}
new L.GeoJSON(residential, {
  onEachFeature: onEachFeature
}).addTo(map);
new L.GeoJSON(commercial, {
  onEachFeature: onEachFeature
}).addTo(map);

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {
  //center: [0, 0],
  crs: L.CRS.Simple,
  //maxBounds: [[-1000, -1000], [1000, 1000]],
  minZoom: -2,
}).setView([0,0]);

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
})
new L.GeoJSON(commercial, {
  onEachFeature: onEachFeature
}).addTo(map);

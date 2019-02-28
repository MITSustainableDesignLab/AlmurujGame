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

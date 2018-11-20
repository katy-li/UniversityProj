

// Create the lightmap layer that will be the background of our map:
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: "pk.eyJ1Ijoic3RldmVsaWFvbW9jaGkiLCJhIjoiY2pvZGs2dWJrMHhibzNrbzFuNjYycnB2OSJ9.oimtqzJnxYXU3c1AXrknhA"
});

// Initializing all the layers we will be using:
var layers = {
  PRIVATE_FOR_PROFIT: new L.LayerGroup(),
  PRIVATE_NOT_FOR_PROFIT: new L.LayerGroup(),
  PUBLIC: new L.LayerGroup(),
};

// Create the map with our layers:
var map = L.map("map-id", {
  center: [38, -95],
  zoom: 4,
  layers: [
    layers.PRIVATE_FOR_PROFIT,
    layers.PRIVATE_NOT_FOR_PROFIT,
    layers.PUBLIC,
  ]
});

// Add our lightmap layer to the map:
lightmap.addTo(map);

// Create an overlay object to add to the layer control:

var overlays = {
  "Private - For Profit" : layers.PRIVATE_FOR_PROFIT,
  "Private - Not For Profit" : layers.PRIVATE_NOT_FOR_PROFIT,
  "Public" : layers.PUBLIC
};

// Create a layer control:
L.control.layers(null, overlays).addTo(map);

// Create legend to demonstrate information about our map:

var info = L.control({
  position: "bottomright"
});

info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

var icons = {
  PRIVATE_FOR_PROFIT: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  PRIVATE_NOT_FOR_PROFIT: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  PUBLIC: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  })
};

// make API call to retrieve data:



 // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
d3.json("data/mapData.geojson", function(data) {
  console.log(data);
   //var updatedAt = infoRes.last_updated;
   //var stationStatus = statusRes.data.stations;
   var FeatureCollection = [];
   schoolName = FeatureCollection.properties.Name;

   // Create an object to keep of the number of markers in each layer
   var schoolCount = {
     PRIVATE_FOR_PROFIT: 0,
     PRIVATE_NOT_FOR_PROFIT: 0,
     PUBLIC: 0
   };

   // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
   var schoolCode;

   // Loop through the stations (they're the same size and have partially matching data)
   for (var i = 0; i < schoolName.length; i++) {

     // Create a new station object with properties of both station objects
     var school = Object.assign({}, data[i]);
     // If a station is listed but not installed, it's coming soon
     if (features.properties.Control === "Private not-for-profit") {
       schoolCode = "PRIVATE_NOT_FOR_PROFIT";
     }
     // If a station has no bikes available, it's empty
     else if (features.properties.Control === "Private for-profit") {
       schoolCode = "PRIVATE_FOR_PROFIT";
     }
     else {
       schoolCode = "PUBLIC";
     }

     // Update the station count
     schoolCount[schoolCode]++;
     // Create a new marker with the appropriate icon and coordinates
     var newMarker = L.marker(features.geometry.coordinates, {
       icon: icons[schoolCode]
     });

     // Add the new marker to the appropriate layer
     newMarker.addTo(layers[schoolCode]);

     // Bind a popup to the marker that will  display on click. This will be rendered as HTML
     newMarker.bindPopup(
       "<h1>" + marker.toGeoJSON().properties.Name + "</h1>"  +
                  'Avg SAT: '+ marker.toGeoJSON().properties.SAT_AVG + ', ' +
                  'Adm Rate: ' + marker.toGeoJSON().properties.ADM_RATE + ', '  +
                  'Higest Degree Offered: ' + marker.toGeoJSON().properties.highestDegree);

 }

   // Call the updateLegend function, which will... update the legend!
   //updateLegend(updatedAt, stationCount);
 });
//});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(time, stationCount) {
 document.querySelector(".legend").innerHTML = [
   "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
   "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
   "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
   "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
   "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
   "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
 ].join("");
}

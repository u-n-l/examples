import * as L from "leaflet";

const tangram = Tangram.leafletLayer({
  scene: "http://localhost:3000/unlYamlStyle",
});

const map = L.map("map", {
  center: [37.773972, -122.431297], //Latitude, Longitude
  zoom: 11,
  layers: [tangram],
});

map.attributionControl.addAttribution("UNL");

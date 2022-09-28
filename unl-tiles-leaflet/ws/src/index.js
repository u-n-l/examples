import * as L from "leaflet";
import config from "../config";
import { getUnlStyle } from "./unlStyle";

const tangram = Tangram.leafletLayer({
  scene: getUnlStyle(config.API_KEY, config.VPM_ID),
});

const map = L.map("map", {
  center: [37.773972, -122.431297], //Latitude, Longitude
  zoom: 11,
  layers: [tangram],
});

map.attributionControl.addAttribution("UNL");

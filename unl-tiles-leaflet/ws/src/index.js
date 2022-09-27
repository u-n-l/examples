import * as L from "leaflet";
import "leaflet-wms-header";
import "leaflet.vectorgrid";
import { unlStyle } from "./unlStyle";
const unlTangramStyle = require("./unlTangramStyle.yaml");

const style = {
  water: {
    fill: true,
    weight: 1,
    fillColor: "#06cccc",
    color: "#06cccc",
    fillOpacity: 0.2,
    opacity: 0.4,
  },
};

// var map = L.map("map").setView([51.505, -0.09], 13);

// RASTER TILES
// L.TileLayer.wmsHeader(
//   "https://sandbox.tiles.unl.global/v2alpha/raster/1/{z}/{x}/{y}?surfaceTile=satellite",
//   {
//     layers: "ne:ne",
//     format: "image/png",
//     transparent: true,
//     attribution: "UNL",
//   },
//   [
//     { header: "x-unl-api-key", value: "QhN38ThEYt5uxAkQY1Bj3mpLzSmR9DyT" },
//     { header: "x-unl-vpm-id", value: "530ca413-83c0-4e87-9c7a-de4a16916257" },
//   ],
//   null
// ).addTo(map);

// VECRTOR TILES - 1st approach
// L.vectorGrid
//   .protobuf("https://sandbox.tiles.unl.global/v2alpha/vector/1/{z}/{x}/{y}", {
//     rendererFactory: L.canvas.tile,
//     attribution: "UNL",
//     vectorTileLayerStyles: unlStyle,
//     fetchOptions: {
//       headers: {
//         "x-unl-api-key": "QhN38ThEYt5uxAkQY1Bj3mpLzSmR9DyT",
//         "x-unl-vpm-id": "530ca413-83c0-4e87-9c7a-de4a16916257",
//       },
//     },
//   })
//   .addTo(map);

//VECTOR TILES - 2nd approach
const tangram = Tangram.leafletLayer({
  scene: "http://localhost:3000/unlYamlStyle",
});

const map = L.map("map", {
  center: [37.773972, -122.431297], //Latitude, Longitude
  zoom: 11,
  layers: [tangram],
});

map.attributionControl.addAttribution("UNL");

import "regenerator-runtime/runtime";
import config from "../config";
import ActionSheet from "./components/ActionSheet";
import { importVenueFromStudio } from "./tutorials/importVenueFromStudio";
import { uploadImdfVenue } from "./tutorials/uploadImdfVenue";
import { loadMapImages } from "./utils/loadMapImages";
import { renderRouteSourceMarker } from "./utils/renderRouteSourceMarker";
import { renderGridLines, updateGridLines } from "./utils/renderGridLines";
import { importPoiFromStudio } from "./tutorials/importPoiFromStudio";
import { createNewPoi } from "./tutorials/createNewPoi";
import { previewRoute } from "./tutorials/previewRoute";
import { updateLevelSelector } from "./utils/updateLevelSelector";
import {
  toggleInputField,
  toggleSubmitButton,
  toggleSearchContent,
} from "./utils/renderPoi";
import { searchPois } from "./tutorials/searchPoi";
import { renderCell, updateCell } from "./utils/renderCell";
import { renderRoute } from "./utils/renderRoute";
import { renderRouteDestinationMarker } from "./utils/renderRouteDestinationMarker";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const app = () => {
  const MAPBOX_TOKEN = config.MAPBOX_TOKEN;
  const HERE_MAPS_API_KEY = config.HERE_MAPS_API_KEY;

  mapboxgl.accessToken = MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: "map",
    style: `https://assets.vector.hereapi.com/styles/berlin/base/mapbox/tilezen?apikey=${HERE_MAPS_API_KEY}`,
    minZoom: 2,
    maxZoom: 20,
  });

  loadMapImages(map);

  map.on("style.load", () => {
    renderGridLines(map);
    renderCell(map);
    renderRouteDestinationMarker(map);
    renderRouteSourceMarker(map);
    renderRoute(map);
    map.setLayoutProperty("routeSourceMarker", "visibility", "none");
  });

  map.on("moveend", () => {
    updateGridLines(map);
    updateLevelSelector(map);
  });

  map.on("click", (event) => {
    updateCell(map, event.lngLat, event);
  });

  document.getElementById("action-sheet").innerHTML = ActionSheet();
  document.getElementById("import-poi-button").addEventListener("click", () => {
    importPoiFromStudio(map);
  });
  document.getElementById("create-poi-button").addEventListener("click", () => {
    toggleInputField();
    toggleSubmitButton();
  });
  document
    .getElementById("import-venue-button")
    .addEventListener("click", () => {
      importVenueFromStudio(map);
    });
  document
    .getElementById("upload-venue-button")
    .addEventListener("click", () => {
      uploadImdfVenue(map);
    });
  document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    createNewPoi(map);
  });
  document
    .getElementById("preview-route-button")
    .addEventListener("click", () => {
      previewRoute(map);
    });
  document.getElementById("search-poi-button").addEventListener("click", () => {
    toggleSearchContent();
  });
  document
    .getElementById("search-poi-input")
    .addEventListener("keypress", () => {
      searchPois(map);
    });
};

app();

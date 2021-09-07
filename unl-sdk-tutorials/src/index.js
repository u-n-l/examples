import "regenerator-runtime/runtime";
import ActionSheet from "./components/ActionSheet";
import { importVenueFromStudio } from "./tutorials/importVenueFromStudio";
import { uploadImdfVenue } from "./tutorials/uploadImdfVenue";
import { loadMapImages } from "./utils/loadMapImages";
import { renderRouteSourceMarker } from "./utils/renderRouteSourceMarker";
import { renderGridLines, updateGridLines } from "./utils/renderGridLines";
import { importPoiFromStudio } from "./tutorials/importPoiFromStudio";
import { createNewPoi } from "./tutorials/createNewPoi";
import { previewRoute } from "./tutorials/previewRoute";
import {
  showInputField,
  showSubmitButton,
  toggleSearchContent,
} from "./utils/renderPoi";
import { searchPoi } from "./tutorials/searchPoi";
import {
  renderCell,
  updateCell,
  resetSelectedLocation,
} from "./utils/renderCell";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const app = () => {
  const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN"; // https://docs.mapbox.com/help/glossary/access-token/
  const HERE_MAPS_API_KEY = "YOUR_HERE_MAPS_API_KEY"; // https://developer.here.com/documentation/vector-tiles-api/dev_guide/topics/quickstart.html#get-an-api-key

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
    //renderRouteSourceMarker(map);
  });

  map.on("move", () => {
    updateGridLines(map);
  });

  map.on("click", (event) => {
    updateCell(map, event.lngLat);
  });

  document.getElementById("action-sheet").innerHTML = ActionSheet();

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
  document.getElementById("import-poi-button").addEventListener("click", () => {
    importPoiFromStudio(map);
  });

  document.getElementById("create-poi-button").addEventListener("click", () => {
    showInputField();
    showSubmitButton();
  });

  document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    createNewPoi(map);
    resetSelectedLocation(map);
  });

  document
    .getElementById("preview-route-button")
    .addEventListener("click", () => {
      previewRoute(map);
    });

  document.getElementById("search-poi-button").addEventListener("click", () => {
    toggleSearchContent();
  });

  document.getElementById("search").addEventListener("click", (event) => {
    event.preventDefault();
    searchPoi(map);
  });
};

app();

import "regenerator-runtime/runtime";
import ActionSheet from "./components/ActionSheet";
import { importVenueFromStudio } from "./tutorials/importVenueFromStudio";
import { uploadImdfVenue } from "./tutorials/uploadImdfVenue";
import { loadMapImages } from "./utils/loadMapImages";
import {
  renderRouteDestinationMarker,
  updateDestinationMarkerPosition,
} from "./utils/renderRouteDestinationMarker";
import { renderRouteSourceMarker } from "./utils/renderRouteSourceMarker";
import { renderGridLines } from "./utils/renderGridLines";
import UnlCore from "unl-core";
import { importPoiFromStudio } from "./tutorials/importPoiFromStudio";
import { createNewPoi } from "./tutorials/createNewPoi";
import { previewRoute } from "./tutorials/previewRoute";
import { showInputField, showSubmitButton } from "./utils/renderPoi";

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
    renderRouteDestinationMarker(map);
    renderRouteSourceMarker(map);
  });

  map.on("move", () => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    const unlBounds = {
      n: bounds._ne.lat,
      e: bounds._ne.lng,
      s: bounds._sw.lat,
      w: bounds._sw.lng,
    };

    if (zoom > 18) {
      const gridLines = UnlCore.gridLines(unlBounds);

      map.getSource("gridLines").setData({
        type: "FeatureCollection",
        features: gridLines.map((line) => ({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: line,
          },
        })),
      });
    }
  });

  map.on("click", (event) => {
    updateDestinationMarkerPosition(map, event);
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
  });

  document
    .getElementById("preview-route-button")
    .addEventListener("click", () => {
      previewRoute(map);
    });
};

app();

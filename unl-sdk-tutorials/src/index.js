import "regenerator-runtime/runtime";
import ActionSheet from "./components/ActionSheet";
import { importVenueFromStudio } from "./tutorials/importVenueFromStudio";
import { uploadImdfVenue } from "./tutorials/uploadImdfVenue";
import { loadMapImages } from "./utils/loadMapImages";
import { renderGridLines } from "./utils/renderGridLines";
import UnlCore from "unl-core";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const app = () => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiYm9nZGFuc2ltb24iLCJhIjoiY2t0MDMwdHdzMXdubjJwcHU4eWV2dXFiZSJ9.GD3chB-SiUiy7yIVEZ03zQ"; // https://docs.mapbox.com/help/glossary/access-token/
  const HERE_MAPS_API_KEY = "mDI8QJCMDYlXmWmcU25JAXwb6haFx5ZMYOf21DVXlxk"; // https://developer.here.com/documentation/vector-tiles-api/dev_guide/topics/quickstart.html#get-an-api-key

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
};

app();

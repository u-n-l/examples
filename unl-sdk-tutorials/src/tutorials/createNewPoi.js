import config from "../../config";
import UnlCore from "unl-core";
import { geohashToCoordinates } from "../utils/unlCoreHelpers";
import { createPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const createNewPoi = async (map) => {
  const projectId = config.PROJECT_ID;
  const cellCoordinates = map.getSource("unlCell")._data.geometry.coordinates;

  if (!cellCoordinates.length) {
    alert("Select the POI location on the map!");
  } else {
    const cellCorner =
      map.getSource("unlCell")._data.geometry.coordinates[0][1];

    const poiGeohash = UnlCore.encode(
      cellCorner[1],
      cellCorner[0],
      9 //geohash precision
    );
    const poiCoordinates = geohashToCoordinates(poiGeohash);

    const poiGeojson = {
      type: "Feature",
      geometry: { type: "Point", coordinates: poiCoordinates },
      properties: {
        name: document.getElementById("poi-name-input").value,
        feature_type: "PointOfInterest",
      },
    };

    const poi = await createPoi(projectId, poiGeojson);
    renderPoi(map, poi);
  }
};

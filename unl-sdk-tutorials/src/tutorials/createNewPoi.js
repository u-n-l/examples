import { createPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";
import { geohashToUnlCoordinates } from "../utils/unlCoreHelpers";
import UnlCore from "unl-core";

export const createNewPoi = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const cellCorner = map.getSource("unlCell")._data.geometry.coordinates;

  if (!cellCorner.length) {
    alert("Select the POI location on the map!");
  } else {
    const cellCorner =
      map.getSource("unlCell")._data.geometry.coordinates[0][0];

    const poiGeohash = UnlCore.encode(
      cellCorner[1],
      cellCorner[0],
      9 //geohash precision
    );
    const poiCoordinates = geohashToUnlCoordinates(poiGeohash);

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

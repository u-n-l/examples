import { createPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const createNewPoi = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const poiCoordinates = map.getSource("routeDestinationMarker")._data.geometry
    .coordinates;

  if (!poiCoordinates.length) {
    alert("Select the POI location on the map!");
  } else {
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

import { uploadPoiGeojson } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const uploadPoi = async (map) => {
  const projectId = "e634663b-54d5-446a-88b8-a47d84ead53e";

  const poiGeojson = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [19.843991, 39.654315] },
    properties: {
      name: "Beach",
      feature_type: "PointOfInterest",
    },
  };

  const poi = await uploadPoiGeojson(projectId, poiGeojson);
  renderPoi(map, poi);
};

import { getPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const importPoiFromStudio = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const poiId = "YOUR-POI-ID";

  const poi = await getPoi(projectId, poiId);

  renderPoi(map, poi);
};

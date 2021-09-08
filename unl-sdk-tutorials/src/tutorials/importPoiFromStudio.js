import config from "../../config";
import { getPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const importPoiFromStudio = async (map) => {
  const projectId = config.PROJECT_ID;
  const poiId = config.IMPORTED_POI_ID;

  const poi = await getPoi(projectId, poiId);

  renderPoi(map, poi);
};

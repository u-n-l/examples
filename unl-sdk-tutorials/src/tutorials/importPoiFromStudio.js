import { getPoi } from "../unlApi";
import { renderPoi } from "../utils/renderPoi";

export const importPoiFromStudio = async (map) => {
  const projectId = "e634663b-54d5-446a-88b8-a47d84ead53e";
  const poiId = "a979f860-cc7c-464a-9cb7-b5c4f6da02c0";

  const poi = await getPoi(projectId, poiId);

  renderPoi(map, poi);
};

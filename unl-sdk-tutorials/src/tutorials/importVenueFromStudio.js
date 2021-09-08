import config from "../../config";
import { renderVenue } from "../utils/renderVenue";
import { getImdfFeatures } from "../unlApi";

export const importVenueFromStudio = async (map) => {
  const projectId = config.PROJECT_ID;
  const venueId = config.IMPORTED_VENUE_ID;

  const includedFeatureTypes = ["venue", "level", "unit", "opening"];

  const imdfFeatures = await getImdfFeatures(
    projectId,
    venueId,
    includedFeatureTypes
  );

  renderVenue(map, imdfFeatures);
};

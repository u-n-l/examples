import { renderVenue } from "../utils/renderVenue";
import { getImdfFeatures } from "../unlApi";

export const importVenueFromStudio = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const venueId = "YOUR-VENUE-ID";
  const includedFeatureTypes = ["venue", "level", "unit", "opening"];

  const imdfFeatures = await getImdfFeatures(
    projectId,
    venueId,
    includedFeatureTypes
  );

  renderVenue(map, imdfFeatures);
};

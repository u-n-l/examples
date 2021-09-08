import config from "../../config";
import { renderVenue } from "../utils/renderVenue";
import { uploadImdfArchive, getImdfFeatures } from "../unlApi";

export const uploadImdfVenue = async (map) => {
  const projectId = config.PROJECT_ID;

  const input = document.getElementById("venue-uploader");

  input.onchange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadResult = await uploadImdfArchive(
        projectId,
        e.target.files[0]
      );

      if (uploadResult && uploadResult.id) {
        const includedFeatureTypes = ["venue", "level", "unit", "opening"];
        const imdfFeatures = await getImdfFeatures(
          projectId,
          uploadResult.id,
          includedFeatureTypes
        );
        renderVenue(map, imdfFeatures);
      }
    }
  };

  input.click();
};

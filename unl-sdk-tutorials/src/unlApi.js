import UnlApi from "unl-js-api/dist";

const UNL_API_KEY = "YOUR_UNL_API_KEY"; //https://developer.unl.global/docs/unlSdk/projects-apiKeys
const unlApi = new UnlApi({ apiKey: UNL_API_KEY });

export const uploadImdfArchive = (projectId, imdfArchive) => {
  return unlApi.venuesApi.uploadImdfArchive(projectId, imdfArchive);
};

export const getImdfFeatures = (projectId, venueId, includedFeatureTypes) => {
  return unlApi.venuesApi.getImdfFeatures(
    projectId,
    venueId,
    includedFeatureTypes
  );
};

export const getPoi = (projectId, poiId) => {
  return unlApi.recordsApi.getById(projectId, poiId);
};

export const createPoi = (projectId, poiGeojson) => {
  return unlApi.recordsApi.create(projectId, poiGeojson);
};

export const fetchRoute = (projectId, routeRequest) => {
  return unlApi.routingApi.route(projectId, routeRequest);
};

import config from "../config";
import UnlApi from "unl-js-api";

const UNL_API_KEY = config.UNL_API_KEY;
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

export const fetchRoute = (routeRequest) => {
  return unlApi.routingApi.route(routeRequest);
};

export const getPoi = (projectId, poiId) => {
  return unlApi.recordsApi.getById(projectId, poiId);
};

export const createPoi = (projectId, poiGeojson) => {
  return unlApi.recordsApi.create(projectId, poiGeojson);
};

export const fetchSearchResults = (projectId, searchParams) => {
  return unlApi.searchApi.search(projectId, searchParams);
};

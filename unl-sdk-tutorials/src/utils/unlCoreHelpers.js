import UnlCore from "unl-core";

export function geohashPointToCoordinates(geohashPoint) {
  return [geohashPoint.lon, geohashPoint.lat];
}

export const decodeGeohash = (geohash) => {
  return UnlCore.decode(geohash);
};

export const geohashToCoordinates = (geohash) => {
  return geohashPointToCoordinates(decodeGeohash(geohash));
};

export const getGeohashBoundsForCoordinates = (unlCoordinates, gridType) => {
  const geohash = UnlCore.encode(
    unlCoordinates.lat,
    unlCoordinates.lng,
    gridType
  );

  const unlCoreBounds = UnlCore.bounds(geohash);

  const bounds = {
    northEast: {
      lat: unlCoreBounds.n,
      lng: unlCoreBounds.e,
    },
    southWest: {
      lat: unlCoreBounds.s,
      lng: unlCoreBounds.w,
    },
  };

  return bounds;
};

export const boundsToGeojsonPositionArray = (bounds) => {
  const geojsonPositionArray = [];
  const { southWest, northEast } = bounds;

  geojsonPositionArray.push([southWest.lng, northEast.lat]);
  geojsonPositionArray.push([southWest.lng, southWest.lat]);
  geojsonPositionArray.push([northEast.lng, southWest.lat]);
  geojsonPositionArray.push([northEast.lng, northEast.lat]);
  geojsonPositionArray.push([southWest.lng, northEast.lat]);

  return [geojsonPositionArray];
};

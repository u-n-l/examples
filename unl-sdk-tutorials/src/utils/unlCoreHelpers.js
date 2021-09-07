import UnlCore from "unl-core";

export function geohashPointToUnlCoordinates(geohashPoint) {
  return [geohashPoint.lon, geohashPoint.lat];
}

export const decodeGeohash = (geohash) => {
  return UnlCore.decode(geohash);
};

export const geohashToUnlCoordinates = (geohash) => {
  return geohashPointToUnlCoordinates(decodeGeohash(geohash));
};

export const getGeohashBounds = (geohash) => {
  return unlCoreBoundsToUnlBounds(UnlCore.bounds(geohash));
};

export const unlCoreBoundsToUnlBounds = (unlCoreBounds) => {
  return {
    northEast: {
      lat: unlCoreBounds.n,
      lng: unlCoreBounds.e,
    },
    southWest: {
      lat: unlCoreBounds.s,
      lng: unlCoreBounds.w,
    },
  };
};

export const getGeohashBoundsForCoordinates = (unlCoordinates, gridType) => {
  const geohash = UnlCore.encode(
    unlCoordinates.lat,
    unlCoordinates.lng,
    gridType
  );
  return getGeohashBounds(geohash);
};

export const unlBoundsToGeojsonPositionArray = (bounds) => {
  const geojsonPositionArray = [];
  const { southWest, northEast } = bounds;

  geojsonPositionArray.push([southWest.lng, northEast.lat]);
  geojsonPositionArray.push([southWest.lng, southWest.lat]);
  geojsonPositionArray.push([northEast.lng, southWest.lat]);
  geojsonPositionArray.push([northEast.lng, northEast.lat]);
  geojsonPositionArray.push([southWest.lng, northEast.lat]);

  return [geojsonPositionArray];
};

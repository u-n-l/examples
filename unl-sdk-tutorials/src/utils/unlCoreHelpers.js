import UnlCore from "unl-core";

export const geohashToCoordinates = (geohash) => {
  const geohashPoint = UnlCore.decode(geohash);
  return [geohashPoint.lon, geohashPoint.lat];
};

export const coordinatesToGejsonPositionArray = (coordinates, gridType) => {
  const geojsonPositionArray = [];

  const geohash = UnlCore.encode(coordinates.lat, coordinates.lng, gridType);

  const unlCoreBounds = UnlCore.bounds(geohash);

  geojsonPositionArray.push([unlCoreBounds.w, unlCoreBounds.n]);
  geojsonPositionArray.push([unlCoreBounds.w, unlCoreBounds.s]);
  geojsonPositionArray.push([unlCoreBounds.e, unlCoreBounds.s]);
  geojsonPositionArray.push([unlCoreBounds.e, unlCoreBounds.n]);
  geojsonPositionArray.push([unlCoreBounds.w, unlCoreBounds.n]);

  return [geojsonPositionArray];
};

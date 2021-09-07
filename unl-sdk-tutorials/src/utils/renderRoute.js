export const renderRoute = (map) => {
  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  });
  map.addLayer(
    {
      id: "route",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#32C5FF",
        "line-width": 5,
      },
    },
    "routeDestinationMarker"
  );
};

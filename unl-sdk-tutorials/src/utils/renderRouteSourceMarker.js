export const renderRouteSourceMarker = (map) => {
  map.addSource("routeSourceMarker", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [13.38010311126709, 52.5201416015625],
      },
    },
  });
  map.addLayer({
    id: "routeSourceMarker",
    type: "symbol",
    source: "routeSourceMarker",
    layout: {
      "icon-image": "route_source_icon",
      "icon-size": 0.7,
      "icon-allow-overlap": true,
    },
  });
};

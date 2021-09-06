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
      "icon-image": "venue_marker_icon",
      "icon-size": 0.5,
      "icon-offset": [0, -40],
      "text-font": ["Fira GO Regular"],
      "icon-allow-overlap": true,
    },
  });
};

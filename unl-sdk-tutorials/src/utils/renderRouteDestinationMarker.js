export const renderRouteDestinationMarker = (map) => {
  map.addSource("routeDestinationMarker", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [],
      },
    },
  });
  map.addLayer({
    id: "routeDestinationMarker",
    type: "symbol",
    source: "routeDestinationMarker",
    layout: {
      "icon-image": "venue_marker_icon",
      "icon-size": 0.5,
      "icon-offset": [0, -40],
      "text-font": ["Fira GO Regular"],
      "icon-allow-overlap": true,
    },
  });
};

export const updateDestinationMarkerPosition = (map, event) => {
  var coordinates = event.lngLat;

  map.getSource("routeDestinationMarker").setData({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    },
  });
};

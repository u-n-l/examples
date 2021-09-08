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
      "icon-image": "route_destination_icon",
      "icon-size": 0.5,
      "icon-offset": [0, -40],
      "text-font": ["Fira GO Regular"],
      "icon-allow-overlap": true,
    },
  });
};

export const updateDestinationMarkerPosition = (map, coordinates) => {
  map.getSource("routeDestinationMarker").setData({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates,
    },
  });
};

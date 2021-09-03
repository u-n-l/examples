export const renderGridLines = (map) => {
  map.addSource("gridLines", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });
  map.addLayer({
    id: "gridLines",
    type: "line",
    source: "gridLines",
    paint: {
      "line-color": "#C0C0C0",
      "line-width": 0.5,
    },
    minzoom: 18,
  });
};

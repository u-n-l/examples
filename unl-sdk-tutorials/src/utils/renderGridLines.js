import UnlCore from "unl-core";

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

export const updateGridLines = (map) => {
  const bounds = map.getBounds();
  const zoom = map.getZoom();

  const unlBounds = {
    n: bounds._ne.lat,
    e: bounds._ne.lng,
    s: bounds._sw.lat,
    w: bounds._sw.lng,
  };

  if (zoom > 18) {
    const gridLines = UnlCore.gridLines(unlBounds);

    map.getSource("gridLines").setData({
      type: "FeatureCollection",
      features: gridLines.map((line) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line,
        },
      })),
    });
  }
};

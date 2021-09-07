import {
  getGeohashBoundsForCoordinates,
  unlBoundsToGeojsonPositionArray,
} from "./unlCoreHelpers";

export const renderCell = (map) => {
  map.addSource("unlCell", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [],
      },
    },
  });
  map.addLayer({
    id: "unlCell_fill",
    type: "fill",
    source: "unlCell",
    paint: {
      "fill-color": "#4C4FCA",
      "fill-opacity": 1,
    },
  });
  map.addLayer({
    id: "unlCell_line",
    type: "line",
    source: "unlCell",
    paint: {
      "line-color": "#4C4FCA",
    },
  });
};

export const updateCell = (map, coordinates) => {
  const bounds = getGeohashBoundsForCoordinates(coordinates, 9);

  map.getSource("unlCell").setData({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: unlBoundsToGeojsonPositionArray(bounds),
    },
  });

  map.flyTo({ center: coordinates, zoom: 18 });
};

export const resetSelectedLocation = (map) => {
  map.getSource("unlCell").setData({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [],
    },
  });
};

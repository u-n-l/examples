export const renderPoi = (map, poi) => {
  const poiId = poi.recordId;
  const poiCoordinates = poi.geojson.geometry.coordinates;
  const poiName = poi.geojson.properties.name;

  addPoiMarker(map, poiCoordinates, poiName, poiId);

  map.flyTo({ center: poiCoordinates, zoom: 18 });
};

const addPoiMarker = (map, poiCoordinates, poiName, poiId) => {
  if (map.getSource(`poi_${poiId}`)) {
    return;
  }

  map.addSource(`poi_${poiId}`, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: poiCoordinates,
      },
      properties: {
        name: poiName,
      },
    },
  });

  map.addLayer({
    id: `poi_${poiId}`,
    type: "symbol",
    source: `poi_${poiId}`,
    layout: {
      "icon-image": "default_marker_icon",
      "icon-size": 0.5,
      "icon-offset": [0, -40],
      "text-font": ["Fira GO Regular"],
      "text-field": poiName,
      "text-size": 14,
      "text-anchor": "bottom",
      "text-offset": [0, -3.5],
      "icon-allow-overlap": true,
      "text-allow-overlap": true,
    },
  });
};

export const showInputField = () => {
  var inputField = document.getElementById("poi-name-input");

  if (inputField.style.display !== "block") {
    inputField.style.display = "block";
  } else {
    inputField.style.display = "none";
  }
};

export const showSubmitButton = () => {
  var createButton = document.getElementById("submit");

  if (createButton.style.display !== "block") {
    createButton.style.display = "block";
  } else {
    createButton.style.display = "none";
  }
};

import LevelSelector from "../components/LevelSelector";

const getVenueRenderedFeatures = (imdfFeatures) => {
  const venueFeatureCollection = imdfFeatures.find(
    (feature) => feature.type === "venue"
  );
  const levelFeatureCollection = imdfFeatures.find(
    (feature) => feature.type === "level"
  );
  const unitFeatureCollection = imdfFeatures.find(
    (feature) => feature.type === "unit"
  );
  const openingFeatureCollection = imdfFeatures.find(
    (feature) => feature.type === "opening"
  );

  return {
    venueFeatureCollection,
    levelFeatureCollection,
    unitFeatureCollection,
    openingFeatureCollection,
  };
};

export const renderVenue = (map, imdfFeatures) => {
  const {
    venueFeatureCollection,
    levelFeatureCollection,
    unitFeatureCollection,
    openingFeatureCollection,
  } = getVenueRenderedFeatures(imdfFeatures);

  const venueId = venueFeatureCollection.id;
  const venueCoordinates =
    venueFeatureCollection.geojson.features[0].properties.display_point
      .coordinates;
  const venueGroundLevel = levelFeatureCollection.geojson.features.findIndex(
    (feature) => feature.properties.ordinal === 0
  );
  const groundLevelId =
    levelFeatureCollection.geojson.features[venueGroundLevel].id;
  const venueName = Object.values(
    venueFeatureCollection.geojson.features[0].properties.name
  )[0];

  addVenueMarker(map, venueCoordinates, venueName, venueId);
  addLevel(map, levelFeatureCollection.geojson, venueId);
  addUnit(map, unitFeatureCollection.geojson, venueId);
  addOpening(map, openingFeatureCollection.geojson, venueId);
  if (!document.getElementById("level-selector-container")) {
    displayLevelSelector(
      map,
      levelFeatureCollection,
      venueGroundLevel,
      venueId
    );

    handleLevelSelected(map, venueGroundLevel, groundLevelId, venueId);
  }

  map.flyTo({ center: venueCoordinates, zoom: 14 });
};

const displayLevelSelector = (
  map,
  levelFeatureCollection,
  venueGroundLevel,
  venueId
) => {
  const levelsShortNames = levelFeatureCollection.geojson.features.map(
    (level) => Object.values(level.properties.short_name)[0]
  );

  document.getElementById("level-selector").appendChild(
    LevelSelector(levelsShortNames, venueGroundLevel, (index) => {
      const selectedVenueOrdinal = index - venueGroundLevel;

      const selectedLevelId = levelFeatureCollection.geojson.features.find(
        (feature) => feature.properties.ordinal === selectedVenueOrdinal
      ).id;

      handleLevelSelected(map, venueGroundLevel, selectedLevelId, venueId);
    })
  );
};

const addVenueMarker = (map, venueCoordinates, venueName, venueId) => {
  if (map.getSource(`venueFeature_${venueId}`)) {
    return;
  }

  map.addSource(`venueFeature_${venueId}`, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: venueCoordinates,
      },
      properties: {
        name: venueName,
      },
    },
  });

  map.addLayer({
    id: `venueFeature_${venueId}`,
    type: "symbol",
    source: `venueFeature_${venueId}`,
    layout: {
      "icon-image": "venue_marker_icon",
      "icon-size": 0.5,
      "icon-offset": [0, -40],
      "text-font": ["Fira GO Regular"],
      "text-field": venueName,
      "text-size": 14,
      "text-anchor": "bottom",
      "text-offset": [0, -3.5],
      "icon-allow-overlap": true,
      "text-allow-overlap": true,
    },
  });
};

const addLevel = (map, levelFeatureCollection, venueId) => {
  if (map.getSource(`levelFeature_${venueId}`)) {
    return;
  }

  map.addSource(`levelFeature_${venueId}`, {
    type: "geojson",
    data: levelFeatureCollection,
  });

  map.addLayer(
    {
      id: `levelFeature_Line_${venueId}`,
      type: "line",
      source: `levelFeature_${venueId}`,
      paint: {
        "line-color": "#191C28",
      },
    },
    `venueFeature_${venueId}`
  );
  map.addLayer(
    {
      id: `levelFeature_Fill_${venueId}`,
      type: "fill",
      source: `levelFeature_${venueId}`,
      paint: {
        "fill-color": "#F4F3E1",
        "fill-opacity": 1,
      },
    },
    `levelFeature_Line_${venueId}`
  );
};

const addUnit = (map, unitFeatureCollection, venueId) => {
  if (map.getSource(`unitFeature_${venueId}`)) {
    return;
  }

  map.addSource(`unitFeature_${venueId}`, {
    type: "geojson",
    data: unitFeatureCollection,
  });

  map.addLayer(
    {
      id: `unitFeature_Symbol_${venueId}`,
      type: "symbol",
      source: `unitFeature_${venueId}`,
      layout: {
        "icon-image": "venue_unit_icon",
        "icon-size": 0.5,
        "icon-offset": [0, -10],
        "text-font": ["Fira GO Regular"],
        "text-field": ["get", "en", ["get", "name"]],
        "text-size": 14,
        "text-anchor": "bottom",
        "text-offset": [0, -1.8],
      },
      paint: {
        "text-color": "#5F608C",
      },
    },
    `venueFeature_${venueId}`
  );
  map.addLayer(
    {
      id: `unitFeature_Line_${venueId}`,
      type: "line",
      source: `unitFeature_${venueId}`,
      paint: {
        "line-color": "#191C28",
      },
    },
    `unitFeature_Symbol_${venueId}`
  );
  map.addLayer(
    {
      id: `unitFeature_Fill_${venueId}`,
      type: "fill",
      source: `unitFeature_${venueId}`,
      paint: {
        "fill-color": "#F1F1F1",
      },
    },
    `unitFeature_Line_${venueId}`
  );
};

const addOpening = (map, openingFeatureCollection, venueId) => {
  if (map.getSource(`openingFeature_${venueId}`)) {
    return;
  }

  map.addSource(`openingFeature_${venueId}`, {
    type: "geojson",
    data: openingFeatureCollection,
  });

  map.addLayer(
    {
      id: `openingFeature_Line_${venueId}`,
      type: "line",
      source: `openingFeature_${venueId}`,
      paint: {
        "line-color": "#F3F2E9",
        "line-width": 2,
      },
    },
    `unitFeature_Symbol_${venueId}`
  );
};

const handleLevelSelected = (map, index, selectedLevelId, venueId) => {
  const unitsFilter = [
    "all",
    ["==", ["get", "level_id"], selectedLevelId],
    ["!=", ["get", "category"], "walkway"],
  ];
  const levelsFilter = ["==", "ordinal", index];

  map.setFilter(`levelFeature_Fill_${venueId}`, levelsFilter);
  map.setFilter(`levelFeature_Line_${venueId}`, levelsFilter);

  map.setFilter(`unitFeature_Fill_${venueId}`, unitsFilter);
  map.setFilter(`unitFeature_Symbol_${venueId}`, unitsFilter);
  map.setFilter(`unitFeature_Line_${venueId}`, unitsFilter);
  map.setFilter(`openingFeature_Line_${venueId}`, unitsFilter);
};

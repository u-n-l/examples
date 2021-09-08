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

  const venueCoordinates =
    venueFeatureCollection.geojson.features[0].properties.display_point
      .coordinates;

  addVenueMarker(map, venueFeatureCollection, levelFeatureCollection);
  addLevel(map, levelFeatureCollection);
  addUnit(map, unitFeatureCollection);
  addOpening(map, openingFeatureCollection);

  map.flyTo({ center: venueCoordinates, zoom: 14 });
};

const addVenueMarker = (
  map,
  venueFeatureCollection,
  levelFeatureCollection
) => {
  const venueId = venueFeatureCollection.venueId;
  const venueCoordinates =
    venueFeatureCollection.geojson.features[0].properties.display_point
      .coordinates;
  const venueName = Object.values(
    venueFeatureCollection.geojson.features[0].properties.name
  )[0];

  if (map.getSource(`venueFeature_${venueId}`)) {
    return;
  }

  const venueGroundLevel = levelFeatureCollection.geojson.features.findIndex(
    (feature) => feature.properties.ordinal === 0
  );
  const groundLevelId =
    levelFeatureCollection.geojson.features[venueGroundLevel].id;

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
        venueId,
        venueGroundLevel,
        groundLevelId,
        levelsShortNames: levelFeatureCollection.geojson.features.map(
          (level) => Object.values(level.properties.short_name)[0]
        ),
        levelsOrdinals: levelFeatureCollection.geojson.features.map((level) => {
          return { id: level.id, ordinal: level.properties.ordinal };
        }),
      },
    },
  });

  map.addLayer(
    {
      id: `venueFeature_${venueId}`,
      type: "symbol",
      source: `venueFeature_${venueId}`,
      layout: {
        "icon-image": "default_marker_icon",
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
    },
    "gridLines"
  );
};

const addLevel = (map, levelFeatureCollection) => {
  const venueId = levelFeatureCollection.venueId;

  if (map.getSource(`levelFeature_${venueId}`)) {
    return;
  }

  map.addSource(`levelFeature_${venueId}`, {
    type: "geojson",
    data: {
      ...levelFeatureCollection.geojson,
      features: levelFeatureCollection.geojson.features.map((feature) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            id: feature.id,
            venueId: venueId,
          },
        };
      }),
    },
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

const addUnit = (map, unitFeatureCollection) => {
  const venueId = unitFeatureCollection.venueId;

  if (map.getSource(`unitFeature_${venueId}`)) {
    return;
  }

  map.addSource(`unitFeature_${venueId}`, {
    type: "geojson",
    data: {
      ...unitFeatureCollection.geojson,
      features: unitFeatureCollection.geojson.features.map((feature) => {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            id: feature.id,
            venueId: venueId,
          },
        };
      }),
    },
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

const addOpening = (map, openingFeatureCollection) => {
  const venueId = openingFeatureCollection.venueId;

  if (map.getSource(`openingFeature_${venueId}`)) {
    return;
  }

  map.addSource(`openingFeature_${venueId}`, {
    type: "geojson",
    data: openingFeatureCollection.geojson,
  });

  map.addLayer(
    {
      id: `openingFeature_Line_${venueId}`,
      type: "line",
      source: `openingFeature_${venueId}`,
      paint: {
        "line-color": "#F3F2E9",
        "line-width": 5,
      },
    },
    `unitFeature_Symbol_${venueId}`
  );
};

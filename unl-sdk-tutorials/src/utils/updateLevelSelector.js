import LevelSelector from "../components/LevelSelector";

export const updateLevelSelector = (map) => {
  const renderedFeatures = map.queryRenderedFeatures(map);
  const venueFeature = renderedFeatures.find((feature) =>
    feature.source.startsWith("venueFeature_")
  );

  if (venueFeature) {
    const properties = venueFeature.properties;

    if (
      !document.getElementById(`level-selector-container-${properties.venueId}`)
    ) {
      displayLevelSelector(
        map,
        JSON.parse(properties.levelsShortNames),
        JSON.parse(properties.levelsOrdinals),
        properties.venueGroundLevel,
        properties.venueId
      );

      handleLevelSelected(
        map,
        properties.venueGroundLevel,
        properties.groundLevelId,
        properties.venueId,
        undefined
      );
    }
  }
};

const displayLevelSelector = (
  map,
  levelsShortNames,
  levelsOrdinals,
  venueGroundLevel,
  venueId
) => {
  document.getElementById("level-selector").innerHTML = "";

  document.getElementById("level-selector").appendChild(
    LevelSelector(venueId, levelsShortNames, venueGroundLevel, (index) => {
      const selectedVenueOrdinal = index - venueGroundLevel;

      const selectedLevelId = levelsOrdinals.find(
        (level) => level.ordinal === selectedVenueOrdinal
      ).id;

      handleLevelSelected(
        map,
        venueGroundLevel,
        selectedLevelId,
        venueId,
        selectedVenueOrdinal
      );
    })
  );
};

export const handleLevelSelected = (
  map,
  index,
  selectedLevelId,
  venueId,
  levelIndex
) => {
  const unitsFilter = [
    "all",
    ["==", ["get", "level_id"], selectedLevelId],
    ["!=", ["get", "category"], "walkway"],
  ];
  const levelsFilter = ["==", "ordinal", index];
  const routeFilter = ["==", "elevation", levelIndex];

  map.setFilter(`levelFeature_Fill_${venueId}`, levelsFilter);
  map.setFilter(`levelFeature_Line_${venueId}`, levelsFilter);

  map.setFilter(`unitFeature_Fill_${venueId}`, unitsFilter);
  map.setFilter(`unitFeature_Symbol_${venueId}`, unitsFilter);
  map.setFilter(`unitFeature_Line_${venueId}`, unitsFilter);
  map.setFilter(`openingFeature_Line_${venueId}`, unitsFilter);

  map.setFilter("route", routeFilter);

  if (map.getSource("route")._data.features.length < 2) {
    map.setFilter("route", ["==", "elevation", 0]);
  }
};

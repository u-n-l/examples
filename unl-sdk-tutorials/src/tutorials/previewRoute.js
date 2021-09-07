import UnlCore from "unl-core";
import { fetchRoute } from "../unlApi";
import { updateDestinationMarkerPosition } from "../utils/renderRouteDestinationMarker";
import { geohashToUnlCoordinates } from "../utils/unlCoreHelpers";

const buildDestinationWaypoint = (destinationMapSource) => {
  const destinationSourceProperties = destinationMapSource._data.properties;

  const destinationCellCorner =
    destinationMapSource._data.geometry.coordinates[0][0];

  const destinationGeohash = UnlCore.encode(
    destinationCellCorner[1],
    destinationCellCorner[0],
    9 // geohash precision
  );

  if (destinationSourceProperties.venueId) {
    // indoor waypoint
    const indoorWaypoint = {
      type: "indoor",
      venueId: destinationSourceProperties.venueId,
      unitId: destinationSourceProperties.id,
      levelId: destinationSourceProperties.level_id,
      geohash: destinationGeohash,
    };

    return indoorWaypoint;
  } else {
    // outdoor waypoint
    return {
      type: "geohash",
      geohash: destinationGeohash,
    };
  }
};

export const previewRoute = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const destinationMapSource = map.getSource("unlCell");
  const destinationCell = destinationMapSource._data.geometry.coordinates;

  if (!destinationCell.length) {
    alert("Select the destination cell!");
  } else {
    const sourceCoordinates =
      map.getSource("routeSourceMarker")._data.geometry.coordinates;
    const routeRequest = {
      preference: "fastest",
      waypoints: [
        {
          type: "point",
          coordinates: sourceCoordinates,
        },
        { ...buildDestinationWaypoint(destinationMapSource) },
      ],
    };

    const route = await fetchRoute(projectId, routeRequest);
    const routeCoordinates = route.overview.linestring.map((coords) => {
      const splittedCoords = coords.split(",");
      const lng =
        routeRequest.waypoints[1].type === "indoor"
          ? splittedCoords[0]
          : splittedCoords[1];
      const lat =
        routeRequest.waypoints[1].type === "indoor"
          ? splittedCoords[1]
          : splittedCoords[0];

      return [Number(lng), Number(lat)];
    });

    map.getSource("route").setData({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: routeCoordinates,
      },
    });
    map.setLayoutProperty("routeSourceMarker", "visibility", "visible");

    const destinationCellCorner = destinationCell[0][1];
    const destinationGeohash = UnlCore.encode(
      destinationCellCorner[1],
      destinationCellCorner[0],
      9 // geohash precision
    );
    const destinationCoordinates = geohashToUnlCoordinates(destinationGeohash);

    updateDestinationMarkerPosition(map, destinationCoordinates);
  }
};

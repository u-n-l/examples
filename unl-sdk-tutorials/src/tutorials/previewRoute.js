import UnlCore from "unl-core";
import { fetchRoute } from "../unlApi";

const buildDestinationWaypoint = (destinationMapSource) => {
  const destinationCoordinates =
    destinationMapSource._data.geometry.coordinates;
  const destinationSourceProperties = destinationMapSource._data.properties;

  if (destinationSourceProperties.venueId) {
    // indoor waypoint
    const indoorWaypoint = {
      type: "indoor",
      // venueId: destinationSourceProperties.venueId,
      venueId: "1e6d8d33-36de-4a9a-9c4a-6d1bf1ba95d7",
      unitId: destinationSourceProperties.id,
      levelId: destinationSourceProperties.level_id,
      geohash: UnlCore.encode(
        destinationCoordinates[1],
        destinationCoordinates[0],
        9
      ),
    };

    return indoorWaypoint;
  } else {
    // outdoor waypoint
    return {
      type: "point",
      coordinates: destinationCoordinates,
    };
  }
};

export const previewRoute = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const destinationMapSource = map.getSource("routeDestinationMarker");
  const destinationCoordinates =
    destinationMapSource._data.geometry.coordinates;

  if (!destinationCoordinates.length) {
    alert("select the destination marker!");
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
      debugger;

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
  }
};

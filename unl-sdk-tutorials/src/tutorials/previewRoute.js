import { fetchRoute } from "../unlApi";

export const previewRoute = async (map) => {
  const projectId = "YOUR-PROJECT-ID";
  const destinationCoordinates = map.getSource("routeDestinationMarker")._data
    .geometry.coordinates;

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
        {
          type: "point",
          coordinates: destinationCoordinates,
        },
      ],
    };

    const route = await fetchRoute(projectId, routeRequest);
  }
};

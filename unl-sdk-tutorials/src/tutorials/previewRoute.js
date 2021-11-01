import UnlCore from "unl-core";
import config from "../../config";
import { updateDestinationMarkerPosition } from "../utils/renderRouteDestinationMarker";
import { geohashToCoordinates } from "../utils/unlCoreHelpers";
import { fetchRoute } from "../unlApi";

const buildDestinationWaypoint = (destinationMapSource, destinationGeohash) => {
  const destinationSourceProperties = destinationMapSource._data.properties;
  const projectId = config.PROJECT_ID;

  if (destinationSourceProperties.venueId) {
    // indoor waypoint
    const indoorWaypoint = {
      type: "indoor",
      venueId: destinationSourceProperties.venueId,
      unitId: destinationSourceProperties.id,
      projectId: projectId,
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

var groupBy = function (routeCoordinates, key) {
  return routeCoordinates.reduce(function (elevetatedCoordinates, x) {
    (elevetatedCoordinates[x[key]] = elevetatedCoordinates[x[key]] || []).push(
      x.coordinates
    );
    return elevetatedCoordinates;
  }, {});
};

export const previewRoute = async (map) => {
  const destinationMapSource = map.getSource("unlCell");
  const destinationCell = destinationMapSource._data.geometry.coordinates;

  if (!destinationCell.length) {
    alert("Select the destination cell!");
  } else {
    const sourceCoordinates =
      map.getSource("routeSourceMarker")._data.geometry.coordinates;

    const destinationCellCorner = destinationCell[0][1];
    const destinationGeohash = UnlCore.encode(
      destinationCellCorner[1],
      destinationCellCorner[0],
      9 // geohash precision
    );

    const routeRequest = {
      preference: "fastest",
      waypoints: [
        {
          type: "point",
          coordinates: sourceCoordinates[0] + "," + sourceCoordinates[1],
        },
        {
          ...buildDestinationWaypoint(destinationMapSource, destinationGeohash),
        },
      ],
    };

    const route = await fetchRoute(routeRequest);
    const routeCoordinates = route.overview.linestring.map((geohash) => {
      const decodedGeohash = UnlCore.decode(geohash);
      const lng = decodedGeohash.lon;
      const lat = decodedGeohash.lat;
      const elevation = decodedGeohash.elevation;

      return { coordinates: [Number(lng), Number(lat)], elevation };
    });

    const elevatedRoute = groupBy(routeCoordinates, "elevation");

    const routeSegments = [];
    Object.keys(elevatedRoute).map((key) => {
      return routeSegments.push({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: elevatedRoute[key],
        },
        properties: {
          elevation: Number(key),
        },
      });
    });

    map
      .getSource("route")
      .setData({ type: "FeatureCollection", features: routeSegments });

    if (routeSegments.length < 2) {
      map.setFilter("route", ["==", "elevation", 0]);
    }

    map.setLayoutProperty("routeSourceMarker", "visibility", "visible");

    const destinationCoordinates = geohashToCoordinates(destinationGeohash);
    updateDestinationMarkerPosition(map, destinationCoordinates);
  }
};

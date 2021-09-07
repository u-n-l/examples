import VenueMarkerIcon from "../icons/venue_marker_icon.png";
import VenueUnitIcon from "../icons/venue_unit_icon.png";
import RouteSourceIcon from "../icons/route_source_icon.png";
import RouteDestinationIcon from "../icons/route_destination_icon.png";

const MAP_IMAGES = [
  {
    name: "venue_marker_icon",
    icon: VenueMarkerIcon,
  },
  {
    name: "venue_unit_icon",
    icon: VenueUnitIcon,
  },
  {
    name: "route_source_icon",
    icon: RouteSourceIcon,
  },
  {
    name: "route_destination_icon",
    icon: RouteDestinationIcon,
  },
];

export const loadMapImages = (map) => {
  MAP_IMAGES.forEach((img) => {
    map.loadImage(img.icon, (error, res) => {
      if (error) {
        return;
      }

      map.addImage(img.name, res);
    });
  });
};

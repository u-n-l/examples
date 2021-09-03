import VenueMarkerIcon from "../icons/venue_marker_icon.png";
import VenueUnitIcon from "../icons/venue_unit_icon.png";

const MAP_IMAGES = [
  {
    name: "venue_marker_icon",
    icon: VenueMarkerIcon,
  },
  {
    name: "venue_unit_icon",
    icon: VenueUnitIcon,
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

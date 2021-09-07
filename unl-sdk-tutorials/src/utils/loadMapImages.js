import VenueMarkerIcon from "../icons/marker_icon.png";
import VenueUnitIcon from "../icons/venue_unit_icon.png";
import MarkerIcon from "../icons/marker_icon_satellite.png";

const MAP_IMAGES = [
  {
    name: "marker_icon",
    icon: VenueMarkerIcon,
  },
  {
    name: "venue_unit_icon",
    icon: VenueUnitIcon,
  },
  {
    name: "marker_icon_satellite",
    icon: MarkerIcon,
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

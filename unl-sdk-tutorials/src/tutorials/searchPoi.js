import config from "../../config";
import { fetchSearchResults } from "../unlApi";
import { coordinatesToGejsonPositionArray } from "../utils/unlCoreHelpers";
import { previewRoute } from "./previewRoute";

export const searchPois = async (map) => {
  let searchResultList = document.getElementById("search-result-list");
  searchResultList.innerHTML = "";

  const projectId = config.PROJECT_ID;

  const searchParams = {
    q: document.getElementById("search-poi-input").value,
    lat: 13.406131,
    lon: 52.520936,
  };

  const pois = await fetchSearchResults(projectId, searchParams);

  pois.features.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.properties.name;
    li.classList.add("search-result");
    li.addEventListener("click", () => {
      map.getSource("unlCell").setData({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: coordinatesToGejsonPositionArray(
            {
              lng: item.geometry.coordinates[0],
              lat: item.geometry.coordinates[1],
            },
            9
          ),
        },
        properties: {},
      });

      previewRoute(map);
    });
    searchResultList.appendChild(li);
  });
};

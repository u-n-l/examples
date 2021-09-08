import config from "../../config";
import { fetchSearchResults } from "../unlApi";

export const searchPoi = async (map) => {
  const projectId = config.PROJECT_ID;

  const searchParams = {
    q: document.getElementById("search-poi-input").value,
    lat: 48.7167870251449,
    lon: 2.3657332578918,
  };

  //const poi = await fetchSearchResults(projectId, searchParams);
  const pois = ["anda", "poi", "list"];

  let searchResultList = document.getElementById("search-result-list");

  pois.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    li.classList.add("search-result");
    li.addEventListener("click", () => {
      console.log(item);
      // add preview route
    });
    searchResultList.appendChild(li);
  });
};

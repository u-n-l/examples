import { fetchSearchResults } from "../unlApi";

export const searchPoi = async (map) => {
  const projectId = "e634663b-54d5-446a-88b8-a47d84ead53e";

  const searchParams = {
    q: document.getElementById("search-poi-input").value,
    lat: 48.7167870251449,
    lon: 2.3657332578918,
  };

  const poi = await fetchSearchResults(projectId, searchParams);
};

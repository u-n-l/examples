const ActionSheet = () => {
  const template = `
    <p class="title">UNL SDK Tutorials</p>
    <div id="action-sheet-content" class="action-sheet-content">
      <button id="import-venue-button" class="action-sheet-button">Import IMDF venue from Studio</button>
      <button id="upload-venue-button" class="action-sheet-button">Upload IMDF venue</button>
      <button id="preview-route-button" class="action-sheet-button">Preview route</button>
      <button id="import-poi-button" class="action-sheet-button">Import POI from Studio</button>
      <button id="create-poi-button" class="action-sheet-button">Create new POI</button>
      <form>
        <input id="poi-name-input" class="input" value="POI name" placeholder="POI name"></input>
        <input id="submit" type="submit" class="input" value="Create POI">
      </form>
      <button id="search-poi-button" class="action-sheet-button">Search for POI</button>
      <input id="search-poi-input" class="input" placeholder="Search here"></input>
      <ul id="search-result-list" class="search-result-list"></ul>
    </div>
  `;

  return template;
};

export default ActionSheet;

const ActionSheet = () => {
  const template = `
    <p class="title">UNL SDK Tutorials</p>
    <div id="action-sheet-content" class="action-sheet-content">
      <button id="import-venue-button" class="action-sheet-button">Import IMDF venue from Studio</button>
      <button id="upload-venue-button" class="action-sheet-button">Upload IMDF venue</button>
      <button id="import-poi-button" class="action-sheet-button">Import POI from Studio</button>
      <button id="upload-poi-button" class="action-sheet-button">Upload POI</button>
      <input id="name-input" class="action-sheet-button"></input>
      <input id="submit" type="submit" value="Submit">
    </div>
  `;

  return template;
};

export default ActionSheet;

const ActionSheet = () => {
  const template = `
    <p class="title">UNL SDK Tutorials</p>
    <div id="action-sheet-content" class="action-sheet-content">
      <button id="import-venue-button" class="action-sheet-button">Import IMDF venue from Studio</button>
      <button id="upload-venue-button" class="action-sheet-button">Upload IMDF venue</button>
      <button id="preview-route-button" class="action-sheet-button">Preview route</button>
    </div>
  `;

  return template;
};

export default ActionSheet;

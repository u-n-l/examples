const LevelSelector = (venueId, levelNames, venueGroundLevel, onLevelClick) => {
  const root = document.createElement("div");
  root.id = `level-selector-container-${venueId}`;

  levelNames.map((levelName, index) => {
    const levelFab = document.createElement("div");
    const levelNameText = document.createTextNode(levelName);

    levelFab.appendChild(levelNameText);

    levelFab.addEventListener("click", () => {
      root.childNodes.forEach((childNode) =>
        childNode.classList.remove("selected-fab")
      );

      levelFab.classList.add("selected-fab");

      onLevelClick(index);
    });

    levelFab.className = "fab";
    if (index == venueGroundLevel) {
      levelFab.classList.add("selected-fab");
    }

    root.appendChild(levelFab);
  });

  return root;
};

export default LevelSelector;

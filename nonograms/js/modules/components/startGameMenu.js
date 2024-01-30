import { renderElement } from '../render.js';
import { getRandom, state } from '../main.js';
import { fieldRender } from './field.js';

export const renderStartGameMenu = (data) => {
  const gameMenuContainer = renderElement("div", "game-menu", mainContainer, {
    id: "gameMenuContainer"
  });
  const gameForm = renderElement("form", "game-menu-form", gameMenuContainer, {
    id: "gameForm",
  });
  const levelLabel = renderElement("label", "game-menu-label", gameForm, {
    for: "levelSelect",
  });
  levelLabel.textContent = "Choose a level";

  const levelSelect = renderElement("select", "game-menu-select", gameForm, {
    id: "levelSelect",
    name: "level",
  });

  //placeholder level option
  renderElement("option", "game-menu-option", levelSelect, {
    value: "",
    textContent: "-----",
  });

  //render Level options
  for (let key in data.levels) {
    renderElement("option", "game-menu-option", levelSelect, {
      value: key,
      textContent: key,
    });
  }

  const puzzleLabel = renderElement("label", "game-menu-label", gameForm, {
    for: "puzzleSelect",
  });

  puzzleLabel.textContent = "Choose a puzzle";

  const puzzleSelect = renderElement("select", "game-menu-select", gameForm, {
    id: "puzzleSelect",
    name: "puzzle",
  });

  //placeholder level option
  renderElement("option", "game-menu-option", puzzleSelect, {
    value: "",
    textContent: "-----",
  });

  levelSelect.addEventListener("change", function () {
    const selectedLevel = levelSelect.value;

    puzzleSelect.innerHTML = "";

    renderElement("option", "game-menu-option", puzzleSelect, {
      value: "",
      textContent: "-----",
    });

    if (selectedLevel) {
      const puzzlesForLevel = data.levels[selectedLevel];
      for (const puzzleKey in puzzlesForLevel) {
        renderElement("option", "game-menu-option", puzzleSelect, {
          value: puzzleKey,
          textContent: puzzleKey,
        });
      }
    }
  });

  const puzzleButton = renderElement("button", "primary-button", gameForm, {
    type: "button",
    textContent: "Play!",
  });
  const randomButton = renderElement("button", "primary-button", gameForm, {
    type: "button",
    textContent: "Random Game",
  });

  const continueGameButton = renderElement(
    "button",
    "primary-button",
    gameForm,
    {
      type: "button",
      textContent: "Continue last Game",
    }
  );
  continueGameButton.addEventListener("click", (e) => {
    continueGameButtonHandler();
  });
  puzzleButton.addEventListener("click", (e) => {
    puzzleButtonHandler(e, levelSelect, puzzleSelect);
  });
  randomButton.addEventListener("click", (e) => {
    randomGameButtonHandler(e, data);
  });
};

export const continueGameButtonHandler = () => {
  for (let key in state) {
    let savedGameState = localStorage.getItem(key);
    savedGameState = savedGameState ? JSON.parse(savedGameState) : null;
    state[key] = savedGameState;
  }
  startTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  const cellsElements = document.querySelectorAll(".row .cell");
  cellsElements.forEach((el) => {
    const row = el.dataset.row;
    const cell = el.dataset.cell;

    if (state.currentUserPuzzle[row][cell]) {
      el.classList.add("filled");
    }
  });
};

export const randomGameButtonHandler = (e, data) => {
  const levelsArr = Object.entries(data.levels);
  const randomLevel = getRandom(levelsArr, state.currentLevel);
  state.currentLevel = randomLevel[0];

  const puzzlesArr = Object.entries(randomLevel[1]);
  const randomPuzzle = getRandom(puzzlesArr, state.currentPuzzle);
  state.currentPuzzleName = randomPuzzle[0];
  state.currentPuzzle = randomPuzzle[1];

  state.currentUserPuzzle = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );
  gameMenuContainer.style.display = "none";
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

export const puzzleButtonHandler = (e, levelSelect, puzzleSelect) => {
  const gameMenuContainer = document.getElementById("gameMenuContainer")
  e.preventDefault();
  const selectedLevel = levelSelect.value;
  const selectedPuzzle = puzzleSelect.value;
  if (selectedLevel && selectedPuzzle) {
    state.currentLevel = levelSelect.value;
    state.currentPuzzleName = puzzleSelect.value;

    gameMenuContainer.style.display = "none";
    state.currentPuzzle =
      state.puzzlesData.levels[levelSelect.value][selectedPuzzle];

    state.currentUserPuzzle = JSON.parse(
      JSON.stringify(state.userPuzzles[selectedLevel])
    );
    fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  } else {
    alert("Choose level and puzzle");
  }
};
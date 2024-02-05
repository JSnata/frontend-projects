import { renderElement, initialRender } from '../render.js';
import { getRandom, state } from '../main.js';
import { fieldRender } from './field.js';
import { startTimer, stopTimer } from './timer.js';

export const renderStartGameMenu = (data) => {
  const gameMenuContainer = renderElement("div", "game-menu", mainContainer, {
    id: "gameMenuContainer"
  });
  const gameForm = renderElement("form", "game-menu-form", gameMenuContainer, {
    id: "gameForm",
  });

  const elementWrap1 = renderElement("div", "item", gameForm);
  const elementWrap2 = renderElement("div", "item", gameForm);

  const levelLabel = renderElement("label", "game-menu-label", elementWrap1, {
    for: "levelSelect",
  });

  levelLabel.textContent = "Choose a level";
  const levelSelect = renderElement("select", "game-menu-select", elementWrap1, {
    id: "levelSelect",
    name: "level",
    
  });
  console.log(state.currentLevel)
  const levelValidationMessage = renderElement("p", "validation-message", elementWrap1, {
    id: "levelValidationMessage",
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

  state.currentLevel && (levelSelect.value = state.currentLevel);

  const puzzleLabel = renderElement("label", "game-menu-label", elementWrap2, {
    for: "puzzleSelect",
  });

  puzzleLabel.textContent = "Choose a puzzle";
  const puzzleSelect = renderElement("select", "game-menu-select", elementWrap2, {
    id: "puzzleSelect",
    name: "puzzle",
  });
  const puzzleValidationMessage = renderElement("p", "validation-message", elementWrap2, {
    id: "puzzleValidationMessage",
  });

  //placeholder level option
  renderElement("option", "game-menu-option", puzzleSelect, {
    value: "",
    textContent: "-----",
  });

  ;

  if (state.currentLevel && state.currentPuzzleName) {
    const puzzlesForLevel = data.levels[state.currentLevel];
      for (const puzzleKey in puzzlesForLevel) {
        renderElement("option", "game-menu-option", puzzleSelect, {
          value: puzzleKey,
          textContent: puzzleKey,
        });
      }

    puzzleSelect.value = state.currentPuzzleName
  }

  levelSelect.addEventListener("change", function () {
    const selectedLevel = levelSelect.value;
    levelValidationMessage.innerText = "";

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

  puzzleSelect.addEventListener("change", function () {
    puzzleValidationMessage.innerText = "";
  });

  const actionsContainer = renderElement("div", "actions-container", gameMenuContainer);

  const puzzleButton = renderElement("button", "primary-button", actionsContainer, {
    type: "button",
    textContent: "Play!",
  });
  const randomButton = renderElement("button", "primary-button", actionsContainer, {
    type: "button",
    textContent: "Random Game",
  });

  const continueGameButton = renderElement(
    "button",
    "primary-button",
      actionsContainer,
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

    let savedGameState = localStorage.getItem("currentPuzzleName");
    savedGameState = savedGameState ? JSON.parse(savedGameState) : null;
    if (!savedGameState) {
      continueGameButton.disabled = true;
    }
};

export const continueGameButtonHandler = () => {
  let savedGameState;
  for (let key in state) {
    savedGameState = localStorage.getItem(key);
    savedGameState = savedGameState ? JSON.parse(savedGameState) : null;
    if (savedGameState) {
      state[key] = savedGameState;
    }
  }

  if(state.seconds){
    startTimer();
  }
  state.isSolutionShowed = false;
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  renderStartGameMenu(state.puzzlesData);
  const cellsElements = document.querySelectorAll(".row .cell");
  cellsElements.forEach((el) => {
    const row = el.dataset.row;
    const cell = el.dataset.cell;

    if (state.currentUserPuzzle[row][cell]) {
      el.classList.add("filled");
    }
    if (state.currentUserPuzzleCrossed[row][cell]) {
      el.classList.add("crossed");
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
  state.currentUserPuzzleCrossed = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );

  state.isSolutionShowed = false;
  stopTimer();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  renderStartGameMenu(state.puzzlesData);
};

export const puzzleButtonHandler = (e, levelSelect, puzzleSelect) => {
  const gameMenuContainer = document.getElementById("gameMenuContainer");
  e.preventDefault();
  const selectedLevel = levelSelect.value;
  const selectedPuzzle = puzzleSelect.value;

  stopTimer();

  if (selectedLevel && selectedPuzzle) {
    state.currentLevel = levelSelect.value;
    state.currentPuzzleName = puzzleSelect.value;

    gameMenuContainer.style.display = "none";
    state.currentPuzzle =
      state.puzzlesData.levels[levelSelect.value][selectedPuzzle];

    state.currentUserPuzzle = JSON.parse(
      JSON.stringify(state.userPuzzles[selectedLevel])
    );
    state.currentUserPuzzleCrossed = JSON.parse(
      JSON.stringify(state.userPuzzles[selectedLevel])
    );
    state.isSolutionShowed = false;
    fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
    renderStartGameMenu(state.puzzlesData);
  } else {
    if(!selectedLevel) {
      const levelValidationMessage = document.getElementById("levelValidationMessage");
      levelValidationMessage.innerText = "Select a game level"
    }
    if(!selectedPuzzle) {
      const puzzleValidationMessage = document.getElementById("puzzleValidationMessage");
      puzzleValidationMessage.innerText = "Select a puzzle"
    }
  }
};
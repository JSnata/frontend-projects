import { renderElement, initialRender } from "../render.js";
import { fieldRender } from "./field.js";
import { state } from "../main.js";
import { renderStartGameMenu } from './startGameMenu.js';
import { resetTimer, stopTimer } from "./timer.js";

let isSolutionShowed = false;

export const renderUserMenu = () => {
  const userMenuContainer = renderElement("div", "user-menu", mainContainer);
  renderElement("p", "saved-message", mainContainer, {
    id: "savedMessage"
  });
  const resetButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    { id: "resetButton",
      innerText: "Reset",
    }
  );
  const solutionButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    {
      innerText: "Solution",
    }
  );
  const newGameButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    {
      innerText: "New Game",
    }
  );
  const saveGameButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    { 
      id: "saveGameButton",
      innerText: "Save Game",
    }
  );
  saveGameButton.addEventListener("click", (e) => {
    handleSaveGameButton();
  });
  if(isSolutionShowed){
    saveGameButton.disabled = true;
  }
  resetButton.addEventListener("click", (e) => {
    handleResetButton();
  });
  if(isSolutionShowed){
    resetButton.disabled = true;
  }
  newGameButton.addEventListener("click", () => {
    handleStartButton();
  });
  solutionButton.addEventListener("click", () => {
    handleSolutionButton();
  });
};

const handleResetButton = () => {
  resetTimer();
  initialRender();
  state.currentUserPuzzle = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );
  state.currentUserPuzzleCrossed = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

export const handleSolutionButton = () => {
  const savedMessageElement = document.getElementById('savedMessage');
  savedMessageElement.innerText = "";
  isSolutionShowed = true;
  stopTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "solution");
};

export const handleSaveGameButton = () => {
  const savedMessageElement = document.getElementById('savedMessage');
  savedMessageElement.innerText = "Game has been saved."
  for (let key in state) {
    localStorage.setItem(`${key}`, JSON.stringify(state[key]));
  }
};

export const handleStartButton = () => {
  isSolutionShowed = false;
  initialRender();
  stopTimer();
  renderStartGameMenu(state.puzzlesData);
};

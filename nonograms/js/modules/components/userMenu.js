import { renderElement, initialRender } from "../render.js";
import { fieldRender } from "./field.js";
import { state } from "../main.js";
import { renderStartGameMenu } from './startGameMenu.js';
import { resetTimer, stopTimer } from "./timer.js";

export const renderUserMenu = () => {
  const userMenuContainer = renderElement("div", "user-menu", mainContainer);
  const resetButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    {
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
      innerText: "Save Game",
    }
  );
  saveGameButton.addEventListener("click", () => {
    handleSaveGameButton();
  });
  resetButton.addEventListener("click", () => {
    handleResetButton();
  });
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
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

export const handleSolutionButton = () => {
  stopTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "solution");
};

export const handleSaveGameButton = () => {
  for (let key in state) {
    localStorage.setItem(`${key}`, JSON.stringify(state[key]));
  }
};

export const handleStartButton = () => {
  initialRender();
  stopTimer();
  renderStartGameMenu(state.puzzlesData);
};

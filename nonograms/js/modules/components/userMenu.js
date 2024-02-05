import { renderElement, initialRender } from "../render.js";
import { fieldRender } from "./field.js";
import { state, fetchPuzzles,fetchUserPuzzles } from "../main.js";
import { renderStartGameMenu } from './startGameMenu.js';
import { resetTimer, stopTimer } from "./timer.js";


export const renderUserMenu = () => {
  const currentHtml = document.getElementById('userMenu');

  currentHtml && currentHtml.remove();

  const userMenuContainer = renderElement("div", "user-menu", mainContainer, {
    id: "userMenu"
  });
  renderElement("p", "saved-message", mainContainer, {
    id: "savedMessage"
  });
  const resetButton = renderElement(
    "button",
    "primary-button",
    userMenuContainer,
    { id: "resetButton",
      innerText: "Reset game",
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
  // const newGameButton = renderElement(
  //   "button",
  //   "primary-button",
  //   userMenuContainer,
  //   {
  //     innerText: "New Game",
  //   }
  // );
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
  if(state.isSolutionShowed){
    saveGameButton.disabled = true;
  }
  resetButton.addEventListener("click", (e) => {
    handleResetButton();
  });
  if(state.isSolutionShowed){
    resetButton.disabled = true;
  }
  // newGameButton.addEventListener("click", () => {
  //   handleStartButton();
  // });
  solutionButton.addEventListener("click", () => {
    handleSolutionButton();
  });
};

const handleResetButton = () => {
  stopTimer();
  resetTimer();
  initialRender();
  state.currentUserPuzzle = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );
  state.currentUserPuzzleCrossed = JSON.parse(
    JSON.stringify(state.userPuzzles[state.currentLevel])
  );
  renderStartGameMenu(state.puzzlesData);
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

export const handleSolutionButton = () => {
  const savedMessageElement = document.getElementById('savedMessage');
  savedMessageElement.innerText = "";
  state.isSolutionShowed = true;
  stopTimer();
  initialRender();
  renderStartGameMenu(state.puzzlesData);
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
  state.isSolutionShowed = false;

  fetchPuzzles();
  fetchUserPuzzles();
  initialRender();
  stopTimer();
  renderStartGameMenu(state.puzzlesData);
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

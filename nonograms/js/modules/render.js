import { state } from "./main.js";
import { renderAudioElements } from "./components/audioElements.js";
import { renderHighScoresTable } from "./components/highScoresTable.js";
import { handleStartButton } from "./components/userMenu.js";

export const renderElement = (child, className, parent, attr) => {
  const element = document.createElement(child);
  className && (element.className = className);
  parent && parent.append(element);
  if (attr) {
    for (let key in attr) {
      element[key] = attr[key];
    }
  }
  return element;
};

export const initialRender = () => {
  document.body.innerHTML = "";
  const mainContainer = renderElement("div", "main-container", document.body, {
    id: "mainContainer",
  });
  const nonogramContainer = renderElement(
    "div",
    "nonogram-container",
    mainContainer,
    {
      id: "nonogramContainer",
    }
  );
  renderAudioElements();
  state.highScores = JSON.parse(
    localStorage.getItem("highScores") ? localStorage.getItem("highScores") : []
  );
  renderHighScoresTable();
};

export const renderTime = (seconds, element) => {
  let minutesCounter = Math.floor(seconds / 60);
  let secondsCounter = seconds % 60;
  minutesCounter = minutesCounter < 10 ? `0${minutesCounter}` : minutesCounter;
  secondsCounter = secondsCounter < 10 ? `0${secondsCounter}` : secondsCounter;

  const renderTime = `${minutesCounter}:${secondsCounter}`;
  element.innerText = renderTime;
};


export const renderModal = (result) => {
  const modal = renderElement("div", "modal", mainContainer);
  const modalContent = renderElement("div", "modal-content", modal);
  const resultMessage = renderElement("h2", "result-message", modalContent, {
    innerText: result,
  });
  const startButton = renderElement("button", "modal-button", modalContent, {
    innerText: "Play Again",
  });
  startButton.addEventListener("click", () => handleStartButton());
  modal.style.display = "flex";
};

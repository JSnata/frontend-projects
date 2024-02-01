import {
  state,
  areArraysEqual
} from '../main.js';

import {
  renderElement
} from "../render.js";

import { renderTimer } from './timer.js';
import { renderUserMenu } from './userMenu.js';
import { startTimer } from './timer.js';
import { winGameHandler } from '../eventHandlers.js';

export const fieldRender = (puzzle, puzzleName, fieldMode) => {
  const nonogramContainer = document.getElementById("nonogramContainer");
  const headerContainer = document.getElementById("mainHeader");

  renderElement("h1", "puzzle-name-container", headerContainer, {
    innerText: puzzleName,
  });

  let topClueCounter = 0;
  puzzle.forEach((rowArr, rowIndex) => {
    //top row clues render
    if (rowIndex === 0) {
      renderTopClue(puzzle);
    }
    //row cells render

    const row = renderElement("div", "row", nonogramContainer);
    //left clue render
    const leftClueElement = renderElement("div", "clue --left", row);
    let leftClueCounter = 0;

    rowArr.forEach((el, i) => {
      //cells rendering
      let cellElement;
      if (el === 1) {
        cellElement =
          fieldMode !== "initial"
            ? renderElement("div", "cell filled", row)
            : renderElement("div", "cell", row);
        leftClueCounter += 1;
      } else {
        leftClueCounter = 0;
        cellElement = renderElement("div", "cell", row);
      }
      cellElement.setAttribute("data-row", `${rowIndex}`);
      cellElement.setAttribute("data-cell", `${i}`);
      cellElement.addEventListener("click", (e) => cellClickHandler(e));
      cellElement.addEventListener("contextmenu", (e) =>
        cellRightClickHandler(e)
      );
      //fill left clue with counter
      if (
        (puzzle[rowIndex][i + 1] === 0 || i + 1 >= rowArr.length) &&
        leftClueCounter
      ) {
        const leftClueNumberElement = renderElement(
          "span",
          "clue-number",
          leftClueElement
        );
        leftClueNumberElement.innerHTML = leftClueCounter;
      }
    });
  });
  renderUserMenu();
  renderTimer();
  console.log("Solution/Решение:", state.currentPuzzle);
};

const renderTopClue = (puzzle) => {
  const nonogramContainer = document.getElementById("nonogramContainer");
  const rowClues = renderElement("div", "row", nonogramContainer);
  renderElement("div", "clue --empty", rowClues);

  //get down through matrix for each column
  puzzle[0].forEach((el, elIndex) => {
    const topCluesNumbersArray = [];
    const topClueElement = renderElement("div", "clue --top", rowClues);
    let counter = puzzle[0][elIndex];
    let rowIndex = 0;
    while (rowIndex + 1 <= puzzle.length) {
      if (puzzle[rowIndex + 1] && puzzle[rowIndex + 1][elIndex]) {
        counter += 1;
      } else {
        counter && topCluesNumbersArray.push(counter);
        counter = 0;
      }
      rowIndex += 1;
    }

    topCluesNumbersArray.forEach((num) => {
      const clueNumberElement = renderElement(
        "span",
        "clue-number",
        topClueElement
      );
      clueNumberElement.innerHTML = num;
    });
  });
};

export const cellRightClickHandler = (e) => {
  const markCrossSoundElement = document.getElementById("markCrossSoundElement");
  const markWhiteSoundElement = document.getElementById("markWhiteSoundElement");
  console.log(markCrossSoundElement);
  const row = e.target.dataset.row;
  const cell = e.target.dataset.cell;
  e.preventDefault();
  e.target.classList.toggle("crossed");
  if (e.target.classList.contains("filled")) {
    e.target.classList.remove("filled");
    state.currentUserPuzzle[row][cell] = 0;
    state.currentUserPuzzleCrossed[row][cell] = 1;
    markCrossSoundElement.currentTime = 0;
    markCrossSoundElement.play();
  }
  if (e.target.classList.contains("crossed")){
    state.currentUserPuzzleCrossed[row][cell] = 1;
    markCrossSoundElement.currentTime = 0;
    markCrossSoundElement.play();
  } else {
    state.currentUserPuzzleCrossed[row][cell] = 0;
    markWhiteSoundElement.currentTime = 0;
    markWhiteSoundElement.play();
  }
};

export const cellClickHandler = (e) => {
  const markBlackSoundElement = document.getElementById("markBlackSoundElement");
  const markWhiteSoundElement = document.getElementById("markWhiteSoundElement");

  e.target.classList.toggle("filled");

  //made userMatrix;
  const row = e.target.dataset.row;
  const cell = e.target.dataset.cell;
  if(e.target.classList.contains("crossed")){
    e.target.classList.remove("crossed");
    state.currentUserPuzzle[row][cell] = 1;
    markBlackSoundElement.currentTime = 0;
    markBlackSoundElement.play();
  }
  if(e.target.classList.contains("filled")){
    state.currentUserPuzzle[row][cell] = 1;
    markBlackSoundElement.currentTime = 0;
    markBlackSoundElement.play();

  } else {
    state.currentUserPuzzle[row][cell] = 0;
    markWhiteSoundElement.currentTime = 0;
    markWhiteSoundElement.play();
  }

  if (!state.timerInterval) {
    startTimer();
  }
  if (areArraysEqual(state.currentUserPuzzle, state.currentPuzzle)) {
    winGameHandler();
  } else {
    console.log("Not Equal");
  }
};

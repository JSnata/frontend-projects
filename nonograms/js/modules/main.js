import { initialRender } from "./render.js";
import { fieldRender } from "./components/field.js"; 

import { renderStartGameMenu } from "./components/startGameMenu.js";

export const state = {
  userPuzzles: null,
  puzzlesData: null, //object
  currentLevel: null, //string
  currentPuzzle: null, //array
  currentUserPuzzle: null, //array
  currentUserPuzzleCrossed: null, //array
  currentPuzzleName: null, //string
  timerInterval: null, //number
  seconds: 0, //number
  highScores: [], //array of objects
  isSolutionShowed: false,
};

export const fetchPuzzles = () => {
  fetch("data/puzzles.json")
    .then((response) => response.json())
    .then((data) => {
      state.puzzlesData = data;

      //first render
      state.currentLevel = "easy";
      const puzzlesArr = Object.entries(data.levels["easy"]);
      const randomPuzzle = getRandom(puzzlesArr, state.currentPuzzle);
      state.currentPuzzleName = randomPuzzle[0];
      state.currentPuzzle = randomPuzzle[1];

      fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
      renderStartGameMenu(data);
    })
    .catch((error) => console.error("Loading JSON error:", error));
};

export const fetchUserPuzzles = () => {
  fetch("data/userPuzzles.json")
    .then((response) => response.json())
    .then((data) => {
      state.userPuzzles = data;
      state.currentUserPuzzle = JSON.parse(
        JSON.stringify(state.userPuzzles[state.currentLevel])
      );
      state.currentUserPuzzleCrossed = JSON.parse(
        JSON.stringify(state.userPuzzles[state.currentLevel])
      );
    })
    .catch((error) => console.error("Loading JSON error:", error));
};

export const getRandom = (data, currentValue) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  if (data[randomIndex][0] === currentValue) {
    return getRandom(data, currentValue);
  } else {
    return data[randomIndex];
  }
};

export const areArraysEqual = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

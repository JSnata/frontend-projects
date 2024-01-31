import { initialRender } from "./render.js";

import { renderStartGameMenu } from "./components/startGameMenu.js";

export const state = {
  userPuzzles: null,
  puzzlesData: null, //object
  currentLevel: null, //string
  currentPuzzle: null, //array
  currentUserPuzzle: null, //array
  currentUserPuzzleCrossed: null, //array
  currentPuzzleName: null, //string
  isLightTheme: true, //boolean
  timerInterval: null, //number
  seconds: 0, //number
  highScores: [], //array of objects
};

export const fetchPuzzles = () => {
  fetch("data/puzzles.json")
    .then((response) => response.json())
    .then((data) => {
      state.puzzlesData = data;
      renderStartGameMenu(data);
    })
    .catch((error) => console.error("Loading JSON error:", error));
};

export const fetchUserPuzzles = () => {
  fetch("data/userPuzzles.json")
    .then((response) => response.json())
    .then((data) => {
      state.userPuzzles = data;
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

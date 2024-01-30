import {
  state,
} from './main.js';

import {
  renderModal
} from './render.js';

import {
  stopTimer,
} from './components/timer.js';

const HIGH_SCORES_MAX = 5;

export const winGameHandler = () => {
  const winSound = document.getElementById('winSound');
  const formattedTime = document.getElementById("timer").textContent;
  winSound.currentTime = 0;
  winSound.play();

  renderModal(
    `Great! You have solved the nonogram in ${formattedTime} seconds!`
  );

  if (state.highScores.length === HIGH_SCORES_MAX) {
    state.highScores.shift();
  }

  state.highScores.push({
    puzzle: state.currentPuzzleName,
    difficulty: state.currentLevel,
    score: state.seconds,
  });

  stopTimer();

  localStorage.setItem("highScores", JSON.stringify(state.highScores));
};


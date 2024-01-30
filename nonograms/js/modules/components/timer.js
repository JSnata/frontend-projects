import {
  state
} from '../main.js';

import {
  renderTime,
  renderElement
} from '../render.js';

export const renderTimer = () => {
  const timerElement = renderElement("div", "timer", mainContainer, {
    id: "timer",
    innerText: "00:00",
  });
};

export const resetTimer = () => {
  const timerElement = document.getElementById("timer");
  stopTimer();
  state.seconds = 0;
  timerElement.innerText = "00:00";
};

export const startTimer = () => {
  state.timerInterval = setInterval(updateTimer, 1000);
};

export const updateTimer = () => {
  const timerElement = document.getElementById("timer");
  state.seconds += 1;
  renderTime(state.seconds, timerElement);
};

export const stopTimer = () => {
  state.seconds = 0;
  clearInterval(state.timerInterval);
  state.timerInterval = null;
};
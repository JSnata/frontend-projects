import {
  state
} from '../main.js';

import {
  renderTime,
  renderElement
} from '../render.js';

let interval = 0;

export const renderTimer = () => {
  const timerElement = renderElement("div", "timer", document.getElementById('mainHeader'), {
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
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
  state.timerInterval = interval;
};

export const updateTimer = () => {
  const timerElement = document.getElementById("timer");
  state.seconds += 1;
  renderTime(state.seconds, timerElement);
};

export const stopTimer = () => {
  state.seconds = 0;
  clearInterval(interval);
  interval = 0;
  state.timerInterval = 0;
};
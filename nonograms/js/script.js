let userPuzzles = {
  easy: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  medium: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  hard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

let state = {
  puzzlesData: null, //object
  currentLevel: null, //string
  currentPuzzle: null, //array
  currentUserPuzzle: null, //array
  currentPuzzleName: null, //string
  isLightTheme: true, //boolean
  timerInterval: null, //number
  seconds: 0, //number
  highScores: [], //array of objects
};

let mainContainer;
let gameMenuContainer;
let nonogramContainer;

const HIGH_SCORES_MAX = 5;

fetch("data/puzzles.json")
  .then((response) => response.json())
  .then((data) => {
    state.puzzlesData = data;
    renderGameMenu(data);
  })
  .catch((error) => console.error("Loading JSON error:", error));

function areArraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const getRandom = (data, currentValue) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  if (data[randomIndex][0] === currentValue) {
    return getRandom(data, currentValue);
  } else {
    return data[randomIndex];
  }
};

const renderElement = (child, className, parent, attr) => {
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

const renderHighScoresTable = () => {
  if (state.highScores.length) {
    const highScoresTable = renderElement("div", "highscores", mainContainer, {
      id: "highScoresTable",
    });
    const tableHeader = renderElement("thead", "", highScoresTable);
    const tableHeaderTr = renderElement("tr", "", tableHeader);
    const tableHeaderPuzzleName = renderElement("th", "", tableHeaderTr, {
      innerText: "Puzzle:",
    });
    const tableHeaderDifficulty = renderElement("th", "", tableHeaderTr, {
      innerText: "Difficulty:",
    });
    const tableHeaderScore = renderElement("th", "", tableHeaderTr, {
      innerText: "Score:",
    });
    const tbodyElement = renderElement("tbody", "", highScoresTable);
    const sortedHighScores = state.highScores.slice();
    sortedHighScores.sort((a, b) => a.score - b.score);

    sortedHighScores.forEach((el) => {
      const rowElement = renderElement("tr", "", tbodyElement);
      const puzzleElement = renderElement("td", "", rowElement, {
        innerText: el.puzzle,
      });
      const difficultyElement = renderElement("td", "", rowElement, {
        innerText: el.difficulty,
      });
      const scoreElement = renderElement("td", "", rowElement);
      renderTime(el.score, scoreElement);
    });
  }
};

const initialRender = () => {
  document.body.innerHTML = "";
  mainContainer = renderElement("div", "main-container", document.body);
  nonogramContainer = renderElement("div", "nonogram-container", mainContainer);
  state.highScores = JSON.parse(
    localStorage.getItem("highScores") ? localStorage.getItem("highScores") : []
  );
  renderHighScoresTable();
};

const renderGameMenu = (data) => {
  gameMenuContainer = renderElement("div", "game-menu", mainContainer);
  const gameForm = renderElement("form", "game-menu-form", gameMenuContainer, {
    id: "gameForm",
  });
  const levelLabel = renderElement("label", "game-menu-label", gameForm, {
    for: "levelSelect",
  });
  levelLabel.textContent = "Choose a level";

  const levelSelect = renderElement("select", "game-menu-select", gameForm, {
    id: "levelSelect",
    name: "level",
  });

  //placeholder level option
  renderElement("option", "game-menu-option", levelSelect, {
    value: "",
    textContent: "-----",
  });

  //render Level options
  for (key in data.levels) {
    renderElement("option", "game-menu-option", levelSelect, {
      value: key,
      textContent: key,
    });
  }

  const puzzleLabel = renderElement("label", "game-menu-label", gameForm, {
    for: "puzzleSelect",
  });

  puzzleLabel.textContent = "Choose a puzzle";

  const puzzleSelect = renderElement("select", "game-menu-select", gameForm, {
    id: "puzzleSelect",
    name: "puzzle",
  });

  //placeholder level option
  renderElement("option", "game-menu-option", puzzleSelect, {
    value: "",
    textContent: "-----",
  });

  levelSelect.addEventListener("change", function () {
    const selectedLevel = levelSelect.value;

    puzzleSelect.innerHTML = "";

    renderElement("option", "game-menu-option", puzzleSelect, {
      value: "",
      textContent: "-----",
    });

    if (selectedLevel) {
      const puzzlesForLevel = data.levels[selectedLevel];
      for (const puzzleKey in puzzlesForLevel) {
        renderElement("option", "game-menu-option", puzzleSelect, {
          value: puzzleKey,
          textContent: puzzleKey,
        });
      }
    }
  });

  const puzzleButton = renderElement("button", "primary-button", gameForm, {
    type: "button",
    textContent: "Play!",
  });
  const randomButton = renderElement("button", "primary-button", gameForm, {
    type: "button",
    textContent: "Random Game",
  });

  const continueGameButton = renderElement(
    "button",
    "primary-button",
    gameForm,
    {
      type: "button",
      textContent: "Continue last Game",
    }
  );
  continueGameButton.addEventListener("click", (e) => {
    continueGameButtonHandler();
  });
  puzzleButton.addEventListener("click", (e) => {
    puzzleButtonHandler(e, levelSelect, puzzleSelect);
  });
  randomButton.addEventListener("click", (e) => {
    randomGameButtonHandler(e, data);
  });
};

const puzzleButtonHandler = (e, levelSelect, puzzleSelect) => {
  e.preventDefault();
  const selectedLevel = levelSelect.value;
  const selectedPuzzle = puzzleSelect.value;
  if (selectedLevel && selectedPuzzle) {
    state.currentLevel = levelSelect.value;
    state.currentPuzzleName = puzzleSelect.value;

    gameMenuContainer.style.display = "none";
    state.currentPuzzle =
      state.puzzlesData.levels[levelSelect.value][selectedPuzzle];

    state.currentUserPuzzle = JSON.parse(
      JSON.stringify(userPuzzles[selectedLevel])
    );
    fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  } else {
    alert("Choose level and puzzle");
  }
};

const randomGameButtonHandler = (e, data) => {
  const levelsArr = Object.entries(data.levels);
  const randomLevel = getRandom(levelsArr, state.currentLevel);
  state.currentLevel = randomLevel[0];

  const puzzlesArr = Object.entries(randomLevel[1]);
  const randomPuzzle = getRandom(puzzlesArr, state.currentPuzzle);
  state.currentPuzzleName = randomPuzzle[0];
  state.currentPuzzle = randomPuzzle[1];

  state.currentUserPuzzle = JSON.parse(
    JSON.stringify(userPuzzles[state.currentLevel])
  );
  gameMenuContainer.style.display = "none";
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

const fieldRender = (puzzle, puzzleName, fieldMode) => {
  const heading = renderElement("h1", "main-heading", mainContainer, {
    innerText: puzzleName,
  });
  let topClueCounter = 0;
  puzzle.forEach((rowArr, rowIndex) => {
    //top row clues render
    if (rowIndex === 0) {
      getTopClue(puzzle);
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
  renderRestartButtons();
  renderThemeToggle();
  renderTimer();
};

const getTopClue = (puzzle) => {
  rowClues = renderElement("div", "row", nonogramContainer);
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

const renderTimer = () => {
  const timerElement = renderElement("div", "timer", mainContainer, {
    id: "timer",
    innerText: "00:00",
  });
};

const cellClickHandler = (e) => {
  e.target.classList.toggle("filled");

  //made userMatrix;
  const row = e.target.dataset.row;
  const cell = e.target.dataset.cell;
  state.currentUserPuzzle[row][cell] = e.target.classList.contains("filled")
    ? 1
    : 0;
  if (!state.timerInterval) {
    startTimer();
  }
  if (areArraysEqual(state.currentUserPuzzle, state.currentPuzzle)) {
    winGameHandler();
  } else {
    console.log("Not Equal");
  }
};

const winGameHandler = () => {
  const formattedTime = document.getElementById("timer").textContent;

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

const startTimer = () => {
  state.timerInterval = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
  const timerElement = document.getElementById("timer");
  state.seconds += 1;
  renderTime(state.seconds, timerElement);
};

const renderTime = (seconds, element) => {
  let minutesCounter = Math.floor(seconds / 60);
  let secondsCounter = seconds % 60;
  minutesCounter = minutesCounter < 10 ? `0${minutesCounter}` : minutesCounter;
  secondsCounter = secondsCounter < 10 ? `0${secondsCounter}` : secondsCounter;

  const renderTime = `${minutesCounter}:${secondsCounter}`;
  element.innerText = renderTime;
};

const stopTimer = () => {
  state.seconds = 0;
  clearInterval(state.timerInterval);
  state.timerInterval = null;
};

const resetTimer = () => {
  const timerElement = document.getElementById("timer");
  stopTimer();
  state.seconds = 0;
  timerElement.innerText = "00:00";
};

const cellRightClickHandler = (e) => {
  e.preventDefault();
  e.target.classList.toggle("crossed");
  if (e.target.classList.contains("filled")) {
    e.target.classList.remove("filled");
    state.currentUserPuzzle[row][cell] = 0;
  }
};

const renderModal = (result) => {
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

renderThemeToggle = () => {
  const themeToggleContainer = renderElement(
    "div",
    "theme-toggle-container",
    mainContainer
  );
  const inputThemeToggle = renderElement(
    "input",
    "theme-toggle-input",
    themeToggleContainer,
    {
      type: "checkbox",
      id: "theme-toggle",
    }
  );
  inputThemeToggle.addEventListener("change", () => {
    toggleThemeHandler();
  });
  const labelThemeToggle = renderElement("label", "", themeToggleContainer, {
    htmlFor: "theme-toggle",
  });
  const spanThemeToggle = renderElement("span", "", themeToggleContainer, {
    innerText: "Dark Theme",
  });
};

const toggleThemeHandler = () => {
  const root = document.documentElement;
  if (state.isLightTheme) {
    state.isLightTheme = false;
    root.style.setProperty("--bg-color", "rgb(42, 42, 42)");
    root.style.setProperty("--border-color", "#fff");
    root.style.setProperty("--text-color", "#fff");
    root.style.setProperty("--primary-color", "#fff");
  } else {
    state.isLightTheme = true;
    root.style.setProperty("--bg-color", "#fff");
    root.style.setProperty("--border-color", "#717171");
    root.style.setProperty("--text-color", "#000");
    root.style.setProperty("--primary-color", "#1d2443");
  }
};

renderRestartButtons = () => {
  const restartContainer = renderElement("div", "restart", mainContainer);
  const resetButton = renderElement(
    "button",
    "primary-button",
    restartContainer,
    {
      innerText: "Reset",
    }
  );
  const solutionButton = renderElement(
    "button",
    "primary-button",
    restartContainer,
    {
      innerText: "Solution",
    }
  );
  const newGameButton = renderElement(
    "button",
    "primary-button",
    restartContainer,
    {
      innerText: "New Game",
    }
  );
  const saveGameButton = renderElement(
    "button",
    "primary-button",
    restartContainer,
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

const handleStartButton = () => {
  initialRender();
  stopTimer();
  renderGameMenu(state.puzzlesData);
};

const handleResetButton = () => {
  resetTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
};

const handleSolutionButton = () => {
  stopTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "solution");
};

const handleSaveGameButton = () => {
  for (key in state) {
    localStorage.setItem(`${key}`, JSON.stringify(state[key]));
  }
};

initialRender();

const continueGameButtonHandler = () => {
  for (key in state) {
    savedGameState = localStorage.getItem(key);
    savedGameState = savedGameState ? JSON.parse(savedGameState) : null;
    state[key] = savedGameState;
  }
  startTimer();
  initialRender();
  fieldRender(state.currentPuzzle, state.currentPuzzleName, "initial");
  const cellsElements = document.querySelectorAll(".row .cell");
  cellsElements.forEach((el) => {
    const row = el.dataset.row;
    const cell = el.dataset.cell;

    if (state.currentUserPuzzle[row][cell]) {
      el.classList.add("filled");
    }
  });
};

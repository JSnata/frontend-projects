let userPuzzles = {
  "easy": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  "medium": [
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
  "hard": [
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
  ]
}

let puzzlesData;

let mainContainer;
let gameMenuContainer;
let nonogramContainer;

let currentLevel;
let currentPuzzle;
let currentUserPuzzle;
let currentPuzzleName;
let isLightTheme = true;

fetch("data/puzzles.json")
  .then((response) => response.json())
  .then((data) => {
    puzzlesData = data;
    renderGameMenu(data);
  })
  .catch((error) => console.error("Loading JSON error:", error));

function areArraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const getRandom = (data, currentValue) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  console.log(currentValue);
  console.log(data[randomIndex][0]);
  if(data[randomIndex][0] === currentValue) {
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

const initialRender = () => {
  document.body.innerHTML = "";
  mainContainer = renderElement("div", "main-container", document.body);
  nonogramContainer = renderElement("div", "nonogram-container", mainContainer);
};

const renderGameMenu = (data) => {
  gameMenuContainer = renderElement("div", "game-menu", mainContainer);
  const gameForm = renderElement("form", "game-menu-form", gameMenuContainer, {
    id: "gameForm",
  });
  const levelLabel = renderElement("label", "game-menu-label", gameForm, {
    for: "levelSelect",
  });
  levelLabel.textContent = 'Choose a level'

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

  puzzleLabel.textContent = 'Choose a puzzle';

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
    textContent: "Play!"
  })
  const randomButton = renderElement("button", "primary-button", gameForm, {
    type: "button",
    textContent: "Random Game"
  })
  puzzleButton.addEventListener("click", (e) => {puzzleButtonHandler(e, levelSelect, puzzleSelect)});
  randomButton.addEventListener("click", (e) => {randomGameButtonHandler(e, data)});
};

const puzzleButtonHandler = (e, levelSelect, puzzleSelect) => {
  e.preventDefault();
  const selectedLevel = levelSelect.value;
  const selectedPuzzle = puzzleSelect.value;
  if (selectedLevel && selectedPuzzle) {
    currentLevel = levelSelect.value;
    currentPuzzleName =  puzzleSelect.value;

    gameMenuContainer.style.display = "none";
    currentPuzzle = puzzlesData.levels[levelSelect.value][selectedPuzzle];

    currentUserPuzzle = JSON.parse(JSON.stringify(userPuzzles[selectedLevel]));
    fieldRender(currentPuzzle, currentPuzzleName, "initial");
  } else {
    alert("Choose level and puzzle");
  }
}

const randomGameButtonHandler = (e, data, currentLevel, currentPuzzle) => {
  const levelsArr = Object.entries(data.levels);
  const randomLevel = getRandom(levelsArr, currentLevel);
  currentLevel = randomLevel[0];

  const puzzlesArr = Object.entries(randomLevel[1]);
  const randomPuzzle = getRandom(puzzlesArr, currentPuzzle);
  currentPuzzleName = randomPuzzle[0];
  currentPuzzle = randomPuzzle[1];

  gameMenuContainer.style.display = "none";
  fieldRender(currentPuzzle, currentPuzzleName, "initial");
}

const fieldRender = (puzzle, puzzleName, fieldMode) => {
  const heading = renderElement("h1", "main-heading", mainContainer, {
    innerText: puzzleName
  })
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
      cellElement.addEventListener("contextmenu", (e) => cellRightClickHandler(e));
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

const cellClickHandler = (e) => {
  e.target.classList.toggle("filled");

  //made userMatrix;
  const row = e.target.dataset.row;
  const cell = e.target.dataset.cell;
  currentUserPuzzle[row][cell] = e.target.classList.contains("filled") ? 1 : 0;

  if (areArraysEqual(currentUserPuzzle, currentPuzzle)) {
    renderModal("Great! You have solved the nonogram!");
  } else {
    console.log("Not Equal");
  }
};

const cellRightClickHandler = (e) => {
  e.preventDefault();
  e.target.classList.toggle("crossed");
  if(e.target.classList.contains("filled")){
    e.target.classList.remove("filled");
    currentUserPuzzle[row][cell] = 0;
  }
}

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
  const themeToggleContainer = renderElement("div", "theme-toggle-container", mainContainer);
  const inputThemeToggle = renderElement("input", "theme-toggle-input", themeToggleContainer, {
    type: "checkbox",
    id: "theme-toggle"
  });
  inputThemeToggle.addEventListener("change", () => {toggleThemeHandler()})
  const labelThemeToggle = renderElement("label", "", themeToggleContainer, {
    htmlFor: "theme-toggle"
  })
  const spanThemeToggle = renderElement("span", "", themeToggleContainer, {
    innerText: "Dark Theme"
  });
}

const toggleThemeHandler = () => {
  const root = document.documentElement;
  if(isLightTheme){
    isLightTheme = false;
    root.style.setProperty('--bg-color', 'rgb(42, 42, 42)');
    root.style.setProperty('--border-color', '#fff');
    root.style.setProperty('--text-color', '#fff');
    root.style.setProperty('--primary-color', '#fff');
  }else {
    isLightTheme = true;
    root.style.setProperty('--bg-color', '#fff');
    root.style.setProperty('--border-color', '#717171');
    root.style.setProperty('--text-color', '#000');
    root.style.setProperty('--primary-color', '#1d2443');
  }

}

renderRestartButtons = () => {
  const restartContainer = renderElement("div", "restart", mainContainer)
  const resetButton = renderElement("button", "primary-button", restartContainer, {
    innerText: "Reset"
  });
  resetButton.addEventListener("click", () => {handleResetButton()})
  const newGameButton = renderElement("button", "primary-button", restartContainer, {
    innerText: "New Game"
  })
  newGameButton.addEventListener("click", () => {handleStartButton()});
}


const handleStartButton = () => {
  initialRender();
  renderGameMenu(puzzlesData);
};

const handleResetButton = () => {
  initialRender();
  currentUserPuzzle = JSON.parse(JSON.stringify(userPuzzles[currentLevel]));
  console.log(userPuzzles[currentLevel]);
  fieldRender(currentPuzzle, currentPuzzleName, "initial");
}

initialRender();

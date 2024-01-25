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

// const getRandomPuzzle = () => {
//   const randomIndex = Math.floor(Math.random() * questionsData.length);
//   if(randomIndex === oldQuestionIndex) {
//     return getRandomPuzzle();
//   } else {
//     oldQuestionIndex = randomIndex;
//     return questionsData[randomIndex];
//   }
// };

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

  const puzzleButton = renderElement("button", "form-button", gameForm, {
    type: "button",
    textContent: "Play!"
  })
  const randomButton = renderElement("button", "form-button", gameForm, {
    type: "button",
    textContent: "Random Game"
  })

  puzzleButton.addEventListener("click", (e) => {puzzleButtonHandler(e, levelSelect, puzzleSelect)})
};

const puzzleButtonHandler = (e, levelSelect, puzzleSelect) => {
  e.preventDefault();
  const selectedLevel = levelSelect.value;
  const selectedPuzzle = puzzleSelect.value;
  if (selectedLevel && selectedPuzzle) {
    currentLevel = levelSelect.value;

    gameMenuContainer.style.display = "none";
    currentPuzzle = puzzlesData.levels[levelSelect.value][selectedPuzzle];

    currentUserPuzzle = userPuzzles[selectedLevel];
    fieldRender(currentPuzzle, puzzleSelect.value, "initial");
  } else {
    alert("Choose level and puzzle");
  }
}

const fieldRender = (puzzle, puzzleName, fieldMode) => {
  const heading = renderElement("h1", "main-heading", mainContainer, {
    innerText: "puzzleName"
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
      let ceilElement;
      if (el === 1) {
        ceilElement =
          fieldMode !== "initial"
            ? renderElement("div", "cell filled", row)
            : renderElement("div", "cell", row);
        leftClueCounter += 1;
      } else {
        leftClueCounter = 0;
        ceilElement = renderElement("div", "cell", row);
      }
      ceilElement.setAttribute("data-row", `${rowIndex}`);
      ceilElement.setAttribute("data-cell", `${i}`);
      ceilElement.addEventListener("click", (e) => cellClickHandler(e));
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

const handleStartButton = () => {
  initialRender();
  renderGameMenu(puzzlesData);
};

initialRender();

const initialPuzzle = [
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
];

const puzzle = [
  [0, 0, 1, 1, 1],
  [1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1],
];

let nonogramContainer;

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
  const mainContainer = renderElement("div", "main-container", document.body);
  nonogramContainer = renderElement("div", "nonogram-container", mainContainer);
  fieldRender(puzzle, "initial");
};

const fieldRender = (puzzle, fieldMode) => {
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
        ceilElement = fieldMode !== "initial" ? renderElement("div", "cell filled", row) : renderElement("div", "cell", row);
        leftClueCounter += 1;
      } else {
        leftClueCounter = 0;
        ceilElement = renderElement("div", "cell", row);
      }

      ceilElement.addEventListener("click", (e) => {
        e.target.classList.toggle("filled");
      })

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

initialRender();
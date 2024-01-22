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
  fieldRender(puzzle);
}

const fieldRender = (puzzle) => {
  let topClueCounter = 0;
  puzzle.forEach((rowArr, rowIndex) => {
    //top row clues render
    let rowClues;
    let topClueElement;
    if(rowIndex === 0) {
      rowClues = renderElement("div", "row", nonogramContainer);
      renderElement("div", "clue --empty", rowClues);
    }

    //row cells render
    const row = renderElement("div", "row", nonogramContainer);

    //left clue render
    const leftClueElement = renderElement("div", "clue --left", row);
    let leftClueCounter = 0;
    rowArr.forEach((el, i) => {
        if(rowIndex === 0){
          //top clue counters rendering
          topClueElement = renderElement("div", "clue --top", rowClues);
          topCluesNumbersArray = getTopClue(puzzle, i);
          topCluesNumbersArray.forEach((num) => {
            const clueNumberElement = renderElement("span", "clue-number", topClueElement);
            clueNumberElement.innerHTML = num;
          })
        }
        if(el === 1){
          const element = renderElement("div", "cell filled", row);
          leftClueCounter += 1;
        } else {
          leftClueCounter = 0;
          const element = renderElement("div", "cell", row);
        }

        //fill left clue with counter
        if((puzzle[rowIndex][i + 1] === 0 || i + 1 >= rowArr.length) && leftClueCounter) {
          const leftClueNumberElement = renderElement("span", "clue-number", leftClueElement);
          leftClueNumberElement.innerHTML = leftClueCounter;
        }
    })
  })
}

getTopClue = (puzzle, elIndex) => {
  let counter = puzzle[0][elIndex];
  let rowIndex = 0;
  const topClues = [];
  while (rowIndex + 1 <= puzzle.length) {
    if(puzzle[rowIndex + 1] && puzzle[rowIndex + 1][elIndex]){
      counter += 1;
    } else {
      counter && topClues.push(counter);
      counter = 0;
    }
    rowIndex += 1;
  }
  return topClues;
}

initialRender();
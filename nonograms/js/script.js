const initialPuzzle = [
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
];


const puzzle = [
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1],
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
  puzzle.forEach((arr, rowIndex) => {
    //top row clues render
    if(rowIndex === 0) {
      const rowClues = renderElement("div", "row", nonogramContainer);
      renderElement("div", "clue --empty", rowClues);

      let rowLength = arr.length;
      while(rowLength){
        const topClueElement = renderElement("div", "clue --top", rowClues);
        topClueElement.innerHTML = 10;
        rowLength--;
      }
    }
    //row cells render
    const row = renderElement("div", "row", nonogramContainer);

    const leftClueElement = renderElement("div", "clue --left", row);
    leftClueElement.innerHTML = 10;

    arr.forEach((el, i) => {
        if(el === 1){
          const element = renderElement("div", "cell filled", row);
        } else {
          const element = renderElement("div", "cell", row);
        }
    })
  })
}

initialRender();
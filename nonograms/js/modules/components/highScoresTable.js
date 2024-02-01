import { state } from "../main.js";
import { renderElement, renderTime } from '../render.js';

export const renderHighScoresTable = () => {
  if (state.highScores.length) {
    const sidebarContainer = document.getElementById("sidebarContainer");

    const highScoresTable = renderElement("table", "highscores", sidebarContainer, {
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

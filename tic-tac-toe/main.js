import "./style.css";

const ROWS_COUNT = 3;
const COLS_COUNT = ROWS_COUNT;

const gameArr = Array(ROWS_COUNT)
  .fill(undefined)
  .map(() => Array(COLS_COUNT).fill(undefined));

const populateGameArray = (row, col, val) => {
  gameArr[row][col] = val;
  console.log(`------ New array ------`);
  console.log(gameArr);
};

const captureClick = (e) => {
  const { row, column } = e.target.dataset;
  if (e.target.textContent == "X") e.target.textContent = "O";
  else e.target.textContent = "X";

  populateGameArray(row, column, e.target.textContent);
};

const renderBoard = () => {
  let btnMarkup = ``;

  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < ROWS_COUNT; j++) {
      btnMarkup += `<button data-row="${i}" data-column="${j}"></button>`;
    }
  }
  return `
  <div class="board">
    ${btnMarkup}
  </div>
    
  `;
};

const setupGame = `
  <div>
    <h1>Tic Tac Toe Game (Vanillajs)</h1>
    <p>by Soumil Roy</p>
    ${renderBoard()}
  </div>
`;

document.querySelector("#app").innerHTML = setupGame;
document.querySelector(".board").addEventListener("click", captureClick);

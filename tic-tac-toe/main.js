import "./style.css";

const ROWS_COLS_COUNT = 3;

let currentSymbol = "😀";
let boxCount = ROWS_COLS_COUNT * ROWS_COLS_COUNT;
let selectedBoxCount = 0;

const gameArr = Array(ROWS_COLS_COUNT)
  .fill(undefined)
  .map(() => Array(ROWS_COLS_COUNT).fill(undefined));

const populateGameArray = (row, col, val) => {
  gameArr[row][col] = val;
  console.log(`------ New array ------`);
  console.log(gameArr);
};

const displayMessage = (message = "") => {
  const infoHeading = document.createElement("h2");
  infoHeading.innerText = message;
  infoHeading.style.marginTop = "30px";
  document
    .querySelector(".board")
    .insertAdjacentElement("afterend", infoHeading);
};

const checkForWinner = (symbol) => {
  let winner;

  // Diagonals
  if (
    symbol == gameArr[0][0] &&
    gameArr[0][0] == gameArr[1][1] &&
    gameArr[0][0] == gameArr[2][2]
  ) {
    winner = gameArr[0][0];
  }

  if (
    symbol == gameArr[0][2] &&
    gameArr[0][2] == gameArr[1][1] &&
    gameArr[0][2] == gameArr[2][0]
  ) {
    winner = gameArr[0][2];
  }

  // Rows
  if (
    symbol == gameArr[0][0] &&
    gameArr[0][0] == gameArr[0][1] &&
    gameArr[0][0] == gameArr[0][2]
  ) {
    winner = gameArr[0][0];
  }

  if (
    symbol == gameArr[1][0] &&
    gameArr[1][0] == gameArr[1][1] &&
    gameArr[1][0] == gameArr[1][2]
  ) {
    winner = gameArr[1][0];
  }

  if (
    symbol == gameArr[2][0] &&
    gameArr[2][0] == gameArr[2][1] &&
    gameArr[2][0] == gameArr[2][2]
  ) {
    winner = gameArr[2][0];
  }

  if (
    symbol == gameArr[0][0] &&
    gameArr[0][0] == gameArr[1][0] &&
    gameArr[0][0] == gameArr[2][0]
  ) {
    winner = gameArr[0][0];
  }

  if (
    symbol == gameArr[1][1] &&
    gameArr[0][1] == gameArr[1][1] &&
    gameArr[0][1] == gameArr[2][1]
  ) {
    winner = gameArr[0][1];
  }

  if (
    symbol == gameArr[0][2] &&
    gameArr[0][2] == gameArr[1][2] &&
    gameArr[0][2] == gameArr[2][2]
  ) {
    winner = gameArr[0][2];
  }

  return winner ? winner : null;
};

const freezeGame = (board) => {
  const buttonList = Array.from(board.children);
  buttonList.forEach((btn) => (btn.disabled = true));
};

const captureClick = (e) => {
  e.stopPropagation();

  let winner;
  const { row, column } = e.target.dataset;

  for (let i = 0; i < ROWS_COLS_COUNT; i++) {
    console.log(gameArr[i]);
  }

  if (e.target.textContent) return;

  e.target.textContent = currentSymbol;
  currentSymbol = currentSymbol == "😀" ? "😈" : "😀";

  populateGameArray(row, column, e.target.textContent);
  winner = checkForWinner(e.target.textContent);

  if (winner) {
    console.log(`Winner is `, winner);
    displayMessage(`Hurray!! The winner is ${winner}`);
    freezeGame(document.querySelector(".board"));
    return;
  }

  if (selectedBoxCount === boxCount - 1) {
    displayMessage(`Whoops!! Try again yo!`);
    freezeGame(document.querySelector(".board"));
    return;
  }

  selectedBoxCount++;
};

const renderBoard = () => {
  let btnMarkup = ``;

  for (let i = 0; i < ROWS_COLS_COUNT; i++) {
    for (let j = 0; j < ROWS_COLS_COUNT; j++) {
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
    <h1>Tic Tac Toe Game</h1>
    <p>by Soumil Roy</p>
    ${renderBoard()}
  </div>
`;

document.querySelector("#app").innerHTML = setupGame;
document.querySelector(".board").addEventListener("click", captureClick);

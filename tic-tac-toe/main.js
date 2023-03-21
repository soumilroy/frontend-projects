import "./style.css";
import { checkForWinner } from "./checkforwinner";

const ROWS_COLS_COUNT = 3;

let currentSymbol = "😀";
let boxCount = ROWS_COLS_COUNT * ROWS_COLS_COUNT;
let selectedBoxCount = 0;

let gameArr = Array(ROWS_COLS_COUNT)
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
  infoHeading.classList.add("message");
  document
    .querySelector(".board")
    .insertAdjacentElement("afterend", infoHeading);
};

const removeMessage = () => {
  document.querySelector(".message").remove();
  document.querySelector(".playagain").remove();
};

const freezeGame = (board) => {
  const buttonList = Array.from(board.children);
  buttonList.forEach((btn) => (btn.disabled = true));
};

const unfreezeGame = (board) => {
  const buttonList = Array.from(board.children);
  buttonList.forEach((btn) => {
    btn.disabled = false;
    btn.textContent = "";
  });
};

const resetGame = () => {
  removeMessage();
  unfreezeGame(document.querySelector(".board"));
  selectedBoxCount = 0;
  currentSymbol = "😀";
  gameArr = Array(ROWS_COLS_COUNT)
    .fill(undefined)
    .map(() => Array(ROWS_COLS_COUNT).fill(undefined));
};

const playAgain = () => {
  const playAgainHeading = document.createElement("h2");
  playAgainHeading.innerText = `Play again?`;
  playAgainHeading.style.marginTop = "30px";
  playAgainHeading.classList.add("playagain");
  playAgainHeading.addEventListener("click", resetGame);
  document
    .querySelector(".board")
    .insertAdjacentElement("afterend", playAgainHeading);
};

const captureClick = (e) => {
  e.stopPropagation();

  let winner;
  const { row, column } = e.target.dataset;

  if (e.target.textContent) return;

  e.target.textContent = currentSymbol;
  currentSymbol = currentSymbol == "😀" ? "😈" : "😀";

  populateGameArray(row, column, e.target.textContent);
  winner = checkForWinner(e.target.textContent, gameArr);

  if (winner) {
    console.log(`Winner is `, winner);
    displayMessage(`Hurray!! The winner is ${winner}`);
    playAgain();
    freezeGame(document.querySelector(".board"));
    return;
  }

  if (selectedBoxCount === boxCount - 1) {
    displayMessage(`Whoops!! Try again yo!`);
    playAgain();
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

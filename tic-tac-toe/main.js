import "./style.css";
import { checkForWinner } from "./checkforwinner";
import { SYMBOLS, ROWS_COLS_COUNT, BOX_COUNT, GAME_TEXT } from "./constants";
import {
  createGameBoard,
  displayMessage,
  freezeGame,
  markWinningBoxes,
  gameStartFn,
  switchPlayModes
} from "./functions";
import { initializeGame } from "./game.state";
import { playAudio, setupAudio } from "./sound";

const captureClick = (state, e) => {
  e.stopPropagation();

  let winner;
  const { row, column } = e.target.dataset;

  if (!row || !column || e.target.textContent) return;

  e.target.textContent = state.currentSymbol;

  playAudio(state, "gameMove");

  // Switch symbols
  state.currentSymbol =
    state.currentSymbol == SYMBOLS.player1 ? SYMBOLS.player2 : SYMBOLS.player1;

  // Mark our game array
  state.gameArr[row][column] = e.target.textContent;

  // Mark our box
  e.target.dataset.filled = true;
  e.target.classList.add("pop");

  // We run checks for horizontal/vertical/diagonal symbol marked cells
  winner = checkForWinner(e.target.textContent, state.gameArr);

  if (winner) {
    clearInterval(state.timer);
    freezeGame();
    displayMessage(GAME_TEXT.winner(winner.symbol));
    markWinningBoxes(winner);
    playAudio(state, "win");
    gameStartFn(state, GAME_TEXT.resetBtn);
    return;
  }

  // In case if all cells are filled but no winner, consider match as draw
  if (state.selectedBoxCount === BOX_COUNT - 1) {
    clearInterval(state.timer);
    freezeGame();
    displayMessage(GAME_TEXT.tryAgain);
    playAudio(state, "draw");
    gameStartFn(state, GAME_TEXT.resetBtn);
    return;
  }

  // make sure to update our selected box count on each click
  state.selectedBoxCount++;
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize game
  const state = initializeGame();

  // Setup audio
  setupAudio(state);

  // Create game board 3x3
  document
    .querySelector(".game")
    .appendChild(createGameBoard(ROWS_COLS_COUNT, ROWS_COLS_COUNT));

  // Listen for click events on our board
  document
    .querySelector(".board")
    .addEventListener("click", (e) => captureClick(state, e));

  // Switch Play modes
  document
    .querySelector(".switch")
    .addEventListener("click", () => switchPlayModes(state));

  // Welcome greeting
  displayMessage(GAME_TEXT.welcome);

  // Start game
  gameStartFn(state, GAME_TEXT.startBtn);

  // Make sure our game starts only after button click
  freezeGame();
});

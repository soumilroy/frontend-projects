import "./style.css";
import { checkForWinner } from "./checkforwinner";

document.addEventListener("DOMContentLoaded", () => {
  const ROWS_COLS_COUNT = 3;

  let currentSymbol = "😀";
  let boxCount = ROWS_COLS_COUNT * ROWS_COLS_COUNT;
  let selectedBoxCount = 0;

  let gameArr = Array(ROWS_COLS_COUNT)
    .fill(undefined)
    .map(() => Array(ROWS_COLS_COUNT).fill(undefined));

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

  const freezeGame = () => {
    const buttonList = Array.from(document.querySelectorAll(".board button"));
    buttonList.forEach((btn) => (btn.disabled = true));
  };

  const unfreezeGame = () => {
    const buttonList = Array.from(document.querySelectorAll(".board button"));
    buttonList.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = "";
    });
  };

  const resetGame = () => {
    removeMessage();
    unfreezeGame();
    selectedBoxCount = 0;
    currentSymbol = "😀";
    gameArr = Array(ROWS_COLS_COUNT)
      .fill(undefined)
      .map(() => Array(ROWS_COLS_COUNT).fill(undefined));
  };

  const playAgain = () => {
    const playAgainAlert = document.createElement("p");
    playAgainAlert.innerText = `Play again?`;
    playAgainAlert.style.marginTop = "30px";
    playAgainAlert.classList.add("playagain");
    playAgainAlert.addEventListener("click", resetGame);
    document
      .querySelector(".message")
      .insertAdjacentElement("afterend", playAgainAlert);
  };

  const captureClick = (e) => {
    e.stopPropagation();

    let winner;
    const { row, column } = e.target.dataset;

    if (e.target.textContent) return;

    e.target.textContent = currentSymbol;
    currentSymbol = currentSymbol == "😀" ? "😈" : "😀";

    gameArr[row][column] = e.target.textContent;
    winner = checkForWinner(e.target.textContent, gameArr);

    if (winner) {
      displayMessage(`${winner} wins!!`);
      freezeGame();
      playAgain();
      return;
    }

    if (selectedBoxCount === boxCount - 1) {
      displayMessage(`Whoops!! Try again yo!`);
      freezeGame();
      playAgain();
      return;
    }

    selectedBoxCount++;
  };

  document.querySelector(".board").addEventListener("click", captureClick);
});

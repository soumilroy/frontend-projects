import "./style.css";
import { checkForWinner } from "./checkforwinner";

const SYMBOLS = {
  player1: "😀",
  player2: "😈"
};

const AUDIO_FILES = {
  toggleOn: "sp_3.wav",
  toggleOff: "sp_4.wav",
  win: "kids_yeah.wav",
  draw: "sad.wav"
};

const SVG_FILES = {
  on: "on.svg",
  off: "off.svg"
};

const ROWS_COLS_COUNT = 3,
  boxCount = ROWS_COLS_COUNT * ROWS_COLS_COUNT;

document.addEventListener("DOMContentLoaded", () => {
  let currentSymbol = SYMBOLS.player1,
    selectedBoxCount = 0,
    audioEnabled = true,
    autoplayEnabled = true,
    timer,
    gameArr = Array(ROWS_COLS_COUNT)
      .fill(undefined)
      .map(() => Array(ROWS_COLS_COUNT).fill(undefined));

  const audioSelector = document.querySelector("#audio");
  audioSelector.src = SVG_FILES.on;

  audioSelector.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    audioSelector.src = audioEnabled ? SVG_FILES.on : SVG_FILES.off;
    if (audioEnabled) playSoundFile(AUDIO_FILES.toggleOn);
  });

  const fetchButtonList = () => {
    return Array.from(document.querySelectorAll(".board button"));
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

  const freezeGame = () => {
    const buttonList = fetchButtonList();
    buttonList.forEach((btn) => btn.classList.add("no-click"));
  };

  const unfreezeGame = () => {
    const buttonList = fetchButtonList();
    buttonList.forEach((btn) => {
      btn.disabled = false;
      btn.dataset.filled = "no";
      btn.textContent = "";
      btn.classList.contains("winner") && btn.classList.remove("winner");
      btn.classList.contains("no-click") && btn.classList.remove("no-click");
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

    if (autoplayEnabled) timer = autoGameRunner();
  };

  const gameStartFn = (btnText) => {
    const gameStart = document.createElement("button");
    gameStart.innerText = btnText;
    gameStart.style.marginTop = "30px";
    gameStart.classList.add("playagain");
    gameStart.addEventListener("click", resetGame);
    document
      .querySelector(".message")
      .insertAdjacentElement("afterend", gameStart);
  };

  const playSound = (symbol) => {
    if (!audioEnabled) return;
    const audio = document.createElement("audio");
    audio.src =
      symbol == SYMBOLS.player1 ? AUDIO_FILES.toggleOn : AUDIO_FILES.toggleOff;
    audio.play();
  };

  const playSoundFile = (file) => {
    if (!audioEnabled) return;
    const audio = document.createElement("audio");
    audio.src = file;
    audio.play();
  };

  const autoGameRunner = () => {
    return setInterval(() => {
      const buttonList = Array.from(
        document.querySelectorAll("[data-filled='no']")
      );
      const randomIdx = Math.floor(Math.random() * buttonList.length);
      buttonList[randomIdx].click();
    }, 1000);
  };

  const markWinningBoxes = (winner) => {
    const buttonList = fetchButtonList();
    if (winner.row !== null) {
      buttonList.forEach((btn) => {
        if (btn.dataset.row == winner.row) btn.classList.add("winner");
      });
    }
    if (winner.column !== null) {
      buttonList.forEach((btn) => {
        if (btn.dataset.column == winner.column) btn.classList.add("winner");
      });
    }
    if (winner.diagonal !== null) {
      setWinningDiagonal(winner.diagonal);
    }
  };

  const setWinningDiagonal = (direction) => {
    const buttonList = fetchButtonList();
    if (direction == "left") {
      buttonList.forEach((btn) => {
        if (btn.dataset.row == btn.dataset.column) btn.classList.add("winner");
      });
    }
    if (direction == "right") {
      buttonList.forEach((btn) => {
        if (
          Number(btn.dataset.row) + Number(btn.dataset.column) ==
          ROWS_COLS_COUNT - 1
        )
          btn.classList.add("winner");
      });
    }
  };

  const captureClick = (e) => {
    e.stopPropagation();

    let winner;
    const { row, column } = e.target.dataset;

    if (e.target.textContent) return;

    e.target.textContent = currentSymbol;

    playSound(currentSymbol);
    currentSymbol =
      currentSymbol == SYMBOLS.player1 ? SYMBOLS.player2 : SYMBOLS.player1;

    gameArr[row][column] = e.target.textContent;
    e.target.dataset.filled = true;
    winner = checkForWinner(e.target.textContent, gameArr);

    if (winner) {
      clearInterval(timer);
      displayMessage(`${winner.symbol} wins!!`);
      markWinningBoxes(winner);
      freezeGame();
      playSoundFile(AUDIO_FILES.win);
      gameStartFn("Play again?");
      return;
    }

    if (selectedBoxCount === boxCount - 1) {
      clearInterval(timer);
      displayMessage(`Whoops!! Try again!`);
      freezeGame();
      playSoundFile(AUDIO_FILES.draw);
      gameStartFn("Play again?");
      return;
    }

    selectedBoxCount++;
  };

  document.querySelector(".board").addEventListener("click", captureClick);

  freezeGame();
  displayMessage("Ahoy! Let's play!");
  gameStartFn("Start game");
});

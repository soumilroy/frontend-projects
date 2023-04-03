import { SYMBOLS, ROWS_COLS_COUNT, MOVE_INTERVAL } from "./constants";

// Each cell
export const createButton = (row, column) => {
  const button = document.createElement("button");
  button.dataset.row = row;
  button.dataset.column = column;
  button.dataset.filled = "no";
  return button;
};

// Generate 3x3 cells
export const createGameBoard = (rows, cols) => {
  const board = document.createElement("div");
  board.className = "board";

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const button = createButton(row, col);
      board.appendChild(button);
    }
  }

  return board;
};

// Fetch all cells
export const fetchButtonList = () => {
  return Array.from(document.querySelectorAll(".board button"));
};

// Display various game messages
export const displayMessage = (message = "") => {
  const infoHeading = document.createElement("h2");
  infoHeading.innerText = message;
  infoHeading.style.marginTop = "30px";
  infoHeading.classList.add("message");
  document
    .querySelector(".board")
    .insertAdjacentElement("afterend", infoHeading);
};

// Welcome game start
export const gameStartFn = (state, btnText) => {
  const gameStart = document.createElement("button");
  gameStart.innerText = btnText;
  gameStart.style.marginTop = "30px";
  gameStart.classList.add("playagain");
  gameStart.addEventListener("click", () => resetGame(state));
  document
    .querySelector(".message")
    .insertAdjacentElement("afterend", gameStart);

  if (!state.autoplayEnabled) {
    instantiateMouseTracker();
    startFollowing(state);
  }
};

// Remove message
export const removeMessage = () => {
  document.querySelector(".message").remove();
  document.querySelector(".playagain").remove();
};

// No clicks after win/draw/start state
export const freezeGame = () => {
  const buttonList = fetchButtonList();
  buttonList.forEach((btn) => btn.classList.add("no-click"));
};

// Reset all variables
export const unfreezeGame = () => {
  const buttonList = fetchButtonList();
  buttonList.forEach((btn) => {
    btn.disabled = false;
    btn.dataset.filled = "no";
    btn.textContent = "";
    btn.classList.remove("winner");
    btn.classList.remove("pop");
    btn.classList.remove("no-click");
  });
};

// Check for left/right diagonal paths
export const setWinningDiagonal = (direction) => {
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

// Highlight boxes of winning pattern
export const markWinningBoxes = (winner) => {
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

// Reset entire game
export const resetGame = (state) => {
  removeMessage();
  unfreezeGame();
  state.selectedBoxCount = 0;
  state.currentSymbol = SYMBOLS.player1;
  state.gameArr = Array(ROWS_COLS_COUNT)
    .fill(undefined)
    .map(() => Array(ROWS_COLS_COUNT).fill(undefined));

  if (state.autoplayEnabled) state.timer = autoGameRunner();
};

const startFollowing = (state) => {
  const mouseTrackWrapper = document.querySelector(".track-wrapper");

  if (state.autoplayEnabled) {
    mouseTrackWrapper.style.display = "none";
    return;
  }

  mouseTrackWrapper.style.display = "inline-block";
  document.querySelector("body").addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    mouseTrackWrapper.textContent = state.currentSymbol;
    mouseTrackWrapper.style.position = "absolute";
    mouseTrackWrapper.style.top = clientY - 60 + "px";
    mouseTrackWrapper.style.left = clientX - 50 + "px";
  });
};

const instantiateMouseTracker = () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("track-wrapper");
  wrapper.style.position = "absolute";
  wrapper.style.top = 0 + "px";
  wrapper.style.left = 0 + "px";
  document.querySelector("body").appendChild(wrapper);
};

// Switch play modes
export const switchPlayModes = (state) => {
  state.autoplayEnabled = !state.autoplayEnabled;
  startFollowing(state);
};

// Auto game play, set to run every MOVE_INTERVAL ms
const autoGameRunner = () => {
  return setInterval(() => {
    const buttonList = Array.from(
      document.querySelectorAll("[data-filled='no']")
    );
    const randomIdx = Math.floor(Math.random() * buttonList.length);
    buttonList[randomIdx].click();
  }, MOVE_INTERVAL);
};

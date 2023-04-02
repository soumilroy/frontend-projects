export const SYMBOLS = {
  player1: "😀",
  player2: "😈"
};

export const AUDIO_FILES = {
  toggleOn: "sp_3.wav",
  toggleOff: "sp_4.wav",
  win: "kids_yeah.wav",
  draw: "sad.wav"
};

export const SVG_FILES = {
  on: "on.svg",
  off: "off.svg"
};

export const GAME_TEXT = {
  startBtn: "Start Game",
  resetBtn: "Play again?",
  welcome: "Welcome!",
  tryAgain: "Whoops! Try again!",
  winner: (symbol) => `${symbol} wins this game!`
};

export const ROWS_COLS_COUNT = 3, // Each row/column count
  BOX_COUNT = ROWS_COLS_COUNT * ROWS_COLS_COUNT; // Total boxes

export const MOVE_INTERVAL = 700; // in milliseconds

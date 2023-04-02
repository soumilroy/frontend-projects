import { SYMBOLS, ROWS_COLS_COUNT } from "./constants";

// Game state
export const initializeGame = () => {
  const state = {
    currentSymbol: SYMBOLS.player1,
    selectedBoxCount: 0,
    audioEnabled: true,
    autoplayEnabled: false,
    timer: null,
    gameArr: Array(ROWS_COLS_COUNT)
      .fill(undefined)
      .map(() => Array(ROWS_COLS_COUNT).fill(undefined))
  };

  return state;
};

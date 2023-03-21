export const checkForWinner = (symbol, gameArr) => {
  // Check rows & columns
  for (let i = 0; i < 3; i++) {
    if (
      gameArr[i][0] === symbol &&
      gameArr[i][1] === symbol &&
      gameArr[i][2] === symbol
    ) {
      return symbol;
    }

    if (
      gameArr[0][i] === symbol &&
      gameArr[1][i] === symbol &&
      gameArr[2][i] === symbol
    ) {
      return symbol;
    }
  }

  // Check diagonals
  if (
    (gameArr[0][0] === symbol &&
      gameArr[1][1] === symbol &&
      gameArr[2][2] === symbol) ||
    (gameArr[0][2] === symbol &&
      gameArr[1][1] === symbol &&
      gameArr[2][0] === symbol)
  ) {
    return symbol;
  }

  // No winner found
  return null;
};

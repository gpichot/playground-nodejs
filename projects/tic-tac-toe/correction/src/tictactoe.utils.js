export function getPlayerToMove(board) {
  const xCount = board.flat().filter((x) => x === "X").length;
  const oCount = board.flat().filter((x) => x === "O").length;
  return xCount === oCount ? "X" : "O";
}

export function createNewBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

export function updateBoard(board, x, y) {
  if (getWinner(board)) {
    throw new Error("Game is over");
  }
  const playerToMove = getPlayerToMove(board);

  const isMoveValid = board[y][x] === "";
  if (!isMoveValid) {
    throw new Error("Invalid move - position already taken");
  }

  return board.map((row, rowIndex) => {
    if (rowIndex !== y) return row;
    return row.map((cell, cellIndex) => {
      return cellIndex === x ? playerToMove : cell;
    });
  });
}

export function getWinner(board) {
  const winningCombinations = [
    // Horizontal
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Vertical
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonal
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  const winner = winningCombinations.find((combination) => {
    const isWinner = combination.every((x) => x === combination[0]);
    return isWinner && combination[0] !== "";
  });

  return winner ? winner[0] : null;
}

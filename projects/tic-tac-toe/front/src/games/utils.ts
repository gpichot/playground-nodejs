import { Board, Player } from "./types";

export function getWinner(board: Board): Player | null {
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

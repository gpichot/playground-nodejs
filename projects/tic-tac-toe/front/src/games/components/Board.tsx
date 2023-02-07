import React from "react";

import { useMoveMutation } from "../queries";
import { Board as BoardType } from "../types";
import { getWinner } from "../utils";

import styles from "./Board.module.scss";

type BoardProps = {
  board: BoardType;
  gameId: string;
};

export default function Board({ board, gameId }: BoardProps) {
  const moveMutation = useMoveMutation(gameId);

  const winner = React.useMemo(() => {
    return getWinner(board);
  }, [board]);

  const handleCellClick = (row: number, col: number) => {
    if (winner) return;

    moveMutation.mutate({ x: col, y: row });
  };

  return (
    <div className={styles.board}>
      {winner && <div className={styles.winner}>{winner} wins!</div>}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={styles.cell}
              role="button"
              tabIndex={0}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCellClick(rowIndex, cellIndex);
                }
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

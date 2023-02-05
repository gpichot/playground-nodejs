import { useMoveMutation } from "../queries";

import styles from "./Board.module.scss";

type BoardProps = {
  board: string[][];
  gameId: string;
};

export default function Board({ board, gameId }: BoardProps) {
  const moveMutation = useMoveMutation(gameId);

  const handleCellClick = (row: number, col: number) => {
    moveMutation.mutate({ x: col, y: row });
  };
  return (
    <div className={styles.board}>
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

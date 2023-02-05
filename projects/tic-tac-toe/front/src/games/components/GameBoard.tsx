import React from "react";
import { useParams } from "react-router-dom";

import { useGameQuery } from "../queries";
import Board from "./Board";

export default function GameBoard() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = useGameQuery(gameId);

  if (game.isLoading) {
    return <div>Loading...</div>;
  }

  if (game.isError || !gameId) {
    return <div>Error!</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Game Board</h1>
      <p>Game ID: {game.data._id}</p>
      <Board gameId={gameId} board={game.data.board} />
    </div>
  );
}

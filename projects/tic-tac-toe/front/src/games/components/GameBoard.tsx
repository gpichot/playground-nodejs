import React from "react";
import { useParams } from "react-router-dom";

import { useGameQuery } from "../queries";
import { useGameRoom } from "../socket";
import Board from "./Board";

export default function GameBoardWrapper() {
  const { gameId } = useParams<{ gameId: string }>();

  if (!gameId) {
    return <div>Game not found</div>;
  }

  return <GameBoard gameId={gameId} />;
}

export function GameBoard({ gameId }: { gameId: string }) {
  const game = useGameQuery(gameId);

  useGameRoom(gameId);

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

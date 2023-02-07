import { Server } from "socket.io";

import gameBus from "./bus";

const io = new Server();

const getGameRoom = (gameId) => `game:${gameId}`;

gameBus.on("gameMove", (game) => {
  io.to(getGameRoom(game.id)).emit("gameMove", {
    board: game.board,
    winner: game.winner,
    isOver: game.isOver,
  });
});

gameBus.on("gameCreated", (game) => {
  io.emit("gameCreated", game);
});

io.on("connection", (socket) => {
  socket.on("joinGame", (gameId) => {
    socket.join(getGameRoom(gameId));

    socket.on("disconnect", () => {
      socket.leave(getGameRoom(gameId));
    });

    console.log("Joined game", gameId, socket.id);
  });

  socket.on("leaveGame", (gameId) => {
    socket.leave(getGameRoom(gameId));

    console.log("leaveGame", gameId, socket.id);
  });
});

export default io;

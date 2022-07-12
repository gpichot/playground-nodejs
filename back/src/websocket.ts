import io from "socket.io";
import type { Server } from "http";

export function initWebsocket(httpServer: Server) {
  const server = new io.Server(httpServer, {
    // options
    serveClient: false,
  });

  server.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (msg) => {
      console.log(msg);
      socket.emit("message", "hello world");
    });
  });

  return server;
}

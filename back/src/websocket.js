import io from "socket.io";

import bus from "@/bus";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

export function initWebsocket(server) {
  const serverIO = new io.Server(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    serveClient: false,
  });

  serverIO.on("connection", (socket) => {
    console.log(socket.id);
  });

  bus.on("message", (newMessage) => {
    server.emit("message", newMessage);
  });

  return serverIO;
}

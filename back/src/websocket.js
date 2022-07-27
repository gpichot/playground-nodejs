import io from "socket.io";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

export function initWebsocket(httpServer) {
  const server = new io.Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    serveClient: false,
  });
  server.on('connection', (socket) => {
    console.log("new socket connection", socket.id)
  });
  return server;

}


import io from "socket.io";
import bus from "src/bus";

const CLIENT_URL = process.env.client_URL ?? "http://localhost:3000"

export default function initWebsocket(httpServer) {
    const server = new io.Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
        serveClient: false,
    })

    server.on("connection", (socket) => {
        console.log(`Connecté au client ${socket.id}`)
    })

    bus.on("message", (newMessage) => {
        server.emit('message', newMessage)
    })

    return server
}
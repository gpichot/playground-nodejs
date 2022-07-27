import http from 'http'

import "dotenv/config"

import initWebsocket from './services/websocket'
import app from "./http"

const PORT = process.env.PORT || 3000

const httpServer = http.createServer(app);

export const socketServer = initWebsocket(httpServer)

httpServer.listen(PORT, () => {
    console.log(`Server ready http:// localhost:${PORT}`)
})

export default httpServer
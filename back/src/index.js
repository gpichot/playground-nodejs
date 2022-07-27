import app from "expressSrv.js";
import http from "http";

import "dotenv/config";

import { initWebsocket } from "./websocket";

const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);
export const socketServer = initWebsocket(httpServer);

httpServer.listen(port, () => {
  console.log(`Server ready : http://localhost:${port}`);
});

/*app.listen(port, () => {
  console.log("test port " + port);
});*/

export default httpServer;

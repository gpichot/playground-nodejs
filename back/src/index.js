import app from "./expressServer"
import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import http from "http";
import { app } from "./app";
import { initWebsocket } from "./websocket";


const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

export const socketServer = initWebsocket(httpServer);

httpServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready http://localhost:${PORT}`);
});

//for mongo
/*app.listen(port,"localhost", () => {
    console.log(`listening on ${port}`);
});*/




export default httpServer;



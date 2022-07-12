import { app } from "./app";
import { initWebsocket } from "./websocket";

const httpServer = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready http://localhost:${process.env.PORT}`);
});

export default httpServer;

initWebsocket(httpServer);

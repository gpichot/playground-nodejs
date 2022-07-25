import "dotenv/config";

import { app } from "./app";
import { initWebsocket } from "./websocket";

const PORT = process.env.PORT || 8123;

const httpServer = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server ready http://localhost:${PORT}`);
});

export default httpServer;

initWebsocket(httpServer);

import "dotenv/config";

import app from "./app";
import io from "./websocket";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.attach(server, {
  cors: {
    // Not safe
    origin: "*",
  },
});

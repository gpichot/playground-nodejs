import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";
import cluster from "cluster";

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

if (cluster.worker) {
  io.adapter(createAdapter());

  setupWorker(io);
}

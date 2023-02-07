# Scaling

We will use [pm2](https://pm2.keymetrics.io/) to run the server in production.

1. Create an ecosystem file `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [
    {
      name: "tictactoe-api",
      script: "./build/src/index.js",
      interpreter: "node",
      exec_mode: "cluster",
    },
  ],
};
```

2. Build the project using `yarn build`.

3. Launch the server using `pm2 start ecosystem.config.cjs`.

4. Add an instance of the application with:

```bash
pm2 scale tictactoe-api +1
```

Check the performance with the `ab` utility:

```bash
ab -k -c 10 -n 100 "http://localhost:3000/games/"
```

Add two instances of the application and check the performance of the
application.

## Sockets

Does the socket still works?

We will need to use two components to make the socket works in a cluster with
pm2.

1. Install `@socket.io/pm2`:

```bash
yarn add @socket.io/pm2
```

2. Add the following to the `src/index.js` file:

```javascript
import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";
import cluster from "cluster";

// ...

// At the edd
if (cluster.worker) {
  io.adapter(createAdapter());

  setupWorker(io);
}
```

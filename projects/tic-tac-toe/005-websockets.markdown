# WebSockets

We will use websockets to send real-time updates to the client.

1. Add socket.io to the project

```bash
yarn add socket.io
```

2. Add the following code to `src/websocket.js`:

```javascript
import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  console.log("a user connected");
});

export default io;
```

3. Add and adapt the following code to `src/index.js`:

```javascript
import io from "./websocket";

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

io.attach(server);
```

4. In `src/websocket.js`, add the following code:

```javascript
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
```

Launch the front: go to the the front folder and run`yarn install && yarn dev`.

You should see the following message in the console (express server):

```bash
a user connected
```

5. The front is sending us some events:

- `joinGame` with the game ID as payload when the user joins a game
- `leaveGame` with the game ID when the user leaves a game

Use this events to add the user to a Socket.IO room.

6. The front uses two events to receive the updates from the server:

- `gameMove` with the a payload `{ board, winner, isOver }` when a move is made
- `gameCreated` with the game payload `{ id, board, winner, isOver }` when a new
  game is created

Use `io.to(room).emit(eventName, payload)` to send the events to the users in a
room.

Use `io.emit(eventName, payload)` to broadcast the events to all users.

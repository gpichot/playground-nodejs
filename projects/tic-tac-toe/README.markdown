# Tic Tac Toe

## Objectives

We will build an API that allow users to play a game of Tic Tac Toe. The API will allow users to create a game, make moves, and check the status of the game.

We will make it gradually more complex by adding features such as:

- Validating moves
- Checking for a winner
- Storing the game state in a database
- Use websockets for real-time updates

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.getpostman.com/)

## Create a new project

```bash
npx degit gpichot/rapide/templates/node tictactoe
cd tictactoe
yarn install
```

If you are using JavaScript:

- add `"allowJs": true` to `tsconfig.json` in the `compilerOptions` section ;
- rename `src/index.ts` to `src/index.js` ;
- change the `dev` script in `package.json` to use `src/index.js` in place of
  `src/index.ts`.

Run the project with `yarn dev`.

**Note:** this uses a template I created to bootstrap node projects.
`yarn dev` will run nodemon that will restart the server when you make changes.

## Express

1. Add express using

```bash
yarn add express
```

2. In the index file, add the following code:

```javascript
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

3. Create a new file `app.js` in the `src` folder and add the following code:

```javascript
import express from "express";

const app = express();

export default app;
```

4. Add a route `GET /` that returns a welcome message.

Reminder:

```javascript
app.get("/my-route", (req, res) => {
  res.send("Welcome to Tic Tac Toe");
});
```

You can test it with Postman, Insomnia or curl:

```bash
curl http://localhost:3000
```

5. Create a route `GET /fibonacci/:n` that returns the nth number of the Fibonacci sequence.

Reminder: Retrieve the value of `n` from `req.params.n`.

Use the Fibonacci sequence formula [from readline exercise](../../exercises/CORE-Core-Libraries/102-readline.js).

Curl the `/fibonacci/10` route and check that you get the correct result.

Curl the `/fibonacci/44` route. What happens? Why? Can you curl another route?

At this point, you may want to kill the dev server and restart it.

# 3. Create a game

1. Create a new endpoint that returns an empty board `GET /game`.

For now, we will use a 2d array to represent the board.

2. Create a new endpoint that allow a user to tick a box `POST /game/move`.

The request body should contain the coordinates of the box to tick.

For example, to tick the top left box, the request body should be:

```json
{
  "x": 0,
  "y": 0
}
```

Don't forget to add the `json` middleware to express:

```javascript
app.use(express.json());
```

_Note:_ for the following steps, you can use the `./make-a-game.sh` script to
run a whole game.

3. Handle the following cases:

- The box is already ticked
- The coordinates are invalid

4. Alternate between X and O

5. Add a function to check if there is a winner

6. Add a delete route to reset the game `DELETE /game`.

## Database

For now, we are storing the game state in memory. If we restart the server, the
game will be lost.

We will use MongoDB to store the game state in a database.

1. Add mongoose to the project

```bash
yarn add mongoose
```

2. Create a file `src/mongo.js` to connect to the database:

```javascript
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined");
}

mongoose.set("strict", false);

mongoose.connect(mongoUri);
```

3. Export the following env variables in the shell you are using to run the
   project:

```bash
export MONGODB_URL=mongodb://localhost:27017/tictactoe
# Or ask Gabriel for the connection string
```

Bonus 👌: use `dotenv` to load the env variables from a `.env` file.

4. Create a new file `src/models/game.js` to define the game schema:

```javascript
import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  board: [[String]],
});
```

5. Create a new file `src/routes/games.js`:

```javascript
import express from "express";

const router = express.Router();

export default router;
```

You may want to add the router to the app:

```javascript
import gameRouter from "./routes/games";

app.use("/games", gameRouter);
```

6. Add the following routes:

- `GET /` to retrieve the list of games
- `GET /:id` to retrieve a game by id
- `POST /` to create a new game
- `POST /:id/move` to make a move

Hint: with mongoose:

```javascript
// List all games
await Game.find();
// Retrieve a game by id
await Game.findById(id);
// Create a new game
await Game.create({ board: [] });
// Update a game
await Game.findByIdAndUpdate(id, { board: [] });
```

## WebSockets

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

## Scaling

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

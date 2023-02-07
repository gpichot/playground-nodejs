# MongoDB

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

export default mongoose;
```

Import this file at the top of `src/app.js`.

3. Export the following env variables in the shell you are using to run the
   project:

```bash
export MONGODB_URI=mongodb://localhost:27017/tictactoe
# Or ask Gabriel for the connection string
```

Bonus 👌: use `dotenv` to load the env variables from a `.env` file:

```dotenv
MONGODB_URI=mongodb://localhost:27017/tictactoe
```

4. Create a new file `src/models/game.js` to define the game schema:

```javascript
import mongoose from "../mongo";

const gameSchema = new mongoose.Schema(
  {
    board: [[String]],
  },
  { collection: `games-{my-name}` }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
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

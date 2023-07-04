# PostgreSQL & Prisma

1. Install

```bash
# Install prisma
npm install prisma
# Init prisma
npx prisma init
```

Change the URL in the `.env` file to the correct one (ask me one if needed).

Or create a database and an adequate role:

```
CREATE DATABASE myuser;
CREATE ROLE myuser WITH PASSWORD 'myuser';
GRANT ALL PRIVILEGES ON DATABASE myuser to myuser;
ALTER DATABASE myuser OWNER TO myuser;
ALTER ROLE myuser WITH LOGIN;
ALTER ROLE myuser WITH CREATEDB;
```

2. Create a new Game model in `prisma/schema.prisma`:

```prisma
model Game {
  id        Int     @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  board     Json
}
```

We will store the board state as plain JSON for now.

3. Create a new file `src/routes/games.js`:

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

4. Add the following routes:

- `GET /` to retrieve the list of games
- `GET /:id` to retrieve a game by id
- `POST /` to create a new game
- `POST /:id/move` to make a move

Hint: with prisma:

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ...

const games = await prisma.game.findMany();

const game = await prisma.game.findUnique({
  where: { id: gameId },
});

const game = await prisma.game.create({
    data: { board: /* ... */ },
});

const game = await prisma.game.update({
    where: { id: gameId },
    data: { board: /* ... */ },
});
```

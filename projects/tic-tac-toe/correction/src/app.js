import express from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";
import gamesRouter from "./routes/games";

import { createNewBoard, updateBoard } from "./tictactoe.utils";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const board = createNewBoard();

app.get("/game", (req, res) => {
  res.json(board);
});

const GameMoveSchema = z.object({
  x: z.number().int().min(0).max(2),
  y: z.number().int().min(0).max(2),
});

app.post("/game/move", validateRequestBody(GameMoveSchema), (req, res) => {
  const { x, y } = req.body;

  try {
    updateBoard(board, x, y);
    return res.json(board);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.use("/games", gamesRouter);

export default app;

import express from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

import gameBus from "../bus";
import { Game } from "../mongo";
import { createNewBoard, getWinner, updateBoard } from "../tictactoe.utils";

const router = express.Router();

const GameMoveSchema = z.object({
  x: z.number().int().min(0).max(2),
  y: z.number().int().min(0).max(2),
});

router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

router.post("/", async (req, res) => {
  const game = await Game.create({
    board: createNewBoard(),
  });

  gameBus.emit("gameCreated", game);

  res.status(201).json(game);
});

router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

router.post(
  "/:id/move",
  validateRequestBody(GameMoveSchema),
  async (req, res) => {
    const game = await Game.findById(req.params.id);

    const { x, y } = req.body;

    try {
      game.board = updateBoard(game.board, x, y);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const winner = getWinner(game.board);
    if (winner) {
      game.winner = winner;
      game.isOver = true;
    }

    gameBus.emit("gameMove", game);

    const gameResult = await game.save();

    return res.status(202).json(gameResult);
  }
);

export default router;

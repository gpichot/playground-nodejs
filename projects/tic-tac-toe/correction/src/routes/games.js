import express from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";
import { Game } from "../mongo";
import { createNewBoard, updateBoard } from "../tictactoe.utils";

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
  res.json(game);
});

router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.json(game);
});

router.post(
  "/:id/move",
  validateRequestBody(GameMoveSchema),
  async (req, res) => {
    console.log(req.params);
    const game = await Game.findById(req.params.id);

    const { x, y } = req.body;

    try {
      updateBoard(game.board, x, y);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    await Game.findByIdAndUpdate(req.params.id, game);
    return res.json(game);
  }
);

export default router;

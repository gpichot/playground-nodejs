import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: String,
  board: [[String]],
  winner: { type: String, required: false, default: null },
  isOver: { type: Boolean, required: false, default: false },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

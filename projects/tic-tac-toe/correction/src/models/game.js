import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: String,
  board: [[String]],
  winner: String,
});

const Game = mongoose.model("Game", gameSchema);

export default Game;

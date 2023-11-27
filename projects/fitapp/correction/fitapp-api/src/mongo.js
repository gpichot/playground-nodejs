import mongoose from "mongoose";

export const client = await mongoose.connect(
  "mongodb://localhost:27017/fitomapp"
);

const ExerciseSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  muscles: { type: [String], required: true },
  nombreRepetitions: { type: Number, required: true },
  difficulte: { type: Number, required: true },
  description: { type: String, required: true },
});

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

export default ExerciseModel;

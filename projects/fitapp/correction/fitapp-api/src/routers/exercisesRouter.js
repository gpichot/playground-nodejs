import express from "express";
import ExerciseRepository from "../repositories/ExerciseRepository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { muscle } = req.query;

  const exercises = await ExerciseRepository.getExercises({
    muscle,
  });

  res.json(exercises);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await ExerciseRepository.getExerciseById(id);

    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }

    res.json(exercise);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const exercise = await ExerciseRepository.createExercise(req.body);

  res.status(201).json(exercise);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await ExerciseRepository.updateExercise(id, req.body);
    res.json(req.body);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  await ExerciseRepository.deleteExercise(req.params.id);

  res.status(204).send();
});

export default router;

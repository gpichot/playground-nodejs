import { ExerciseModel } from "../models/ExerciseModel.js";

class ExerciseRepository {
  async getExercises({ muscle }) {
    const query = {};

    if (muscle) {
      query.muscles = { $elemMatch: { $eq: muscle } };
    }
    return await ExerciseModel.find(query);
  }

  async createExercise(payload) {
    const exercise = await ExerciseModel.create(payload);

    return exercise;
  }

  async getExerciseById(id) {
    return await ExerciseModel.findById(id);
  }

  async updateExercise(id, payload) {
    const newExercise = await ExerciseModel.findOneAndUpdate(
      {
        _id: id,
      },
      payload
    );

    return newExercise;
  }

  async deleteExercise(id) {
    await ExerciseModel.deleteOne({ _id: id });
  }
}

export default new ExerciseRepository();

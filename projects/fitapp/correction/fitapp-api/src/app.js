import express from "express";

const app = express();

/**
  interface Exercise {
  id: number;
  nom: string;
  muscles: string[];
  nombreRepetitions: number;
  charge?: number;
  difficulte: number;
  description: string;
}
*/

/**
 * @typedef Exercise
 * @property {integer} id.required
 * @property {string} nom.required
 * @property {Array.<string>} muscles.required
 * @property {integer} nombreRepetitions.required
 * @property {integer} charge
 * @property {integer} difficulte.required
 * @property {string} description.required
 */

/**
 * @type Exercise[]
 */
export const exercices = [
  {
    id: 1,
    nom: "Pompes",
    muscles: ["pectoraux", "épaules", "triceps"],
    nombreRepetitions: 10,
    difficulte: 1,
    description: "Allongé sur le ventre, mains à plat sur le sol,",
  },
  {
    id: 2,
    nom: "Squats",
    muscles: ["quadriceps", "ischios", "fessiers"],
    nombreRepetitions: 20,
    difficulte: 1,
    description: "Debout, pieds écartés à la largeur du bassin,",
  },
  {
    id: 3,
    nom: "Traction",
    muscles: ["grand dorsal", "biceps"],
    nombreRepetitions: 10,
    difficulte: 3,
    description: "Suspendu à une barre fixe,",
  },
];

app.get("/exercises", (req, res) => {
  res.json(exercices);
});

app.get("/exercises/:id", (req, res) => {
  const exercise = exercices.find((e) => e.id === parseInt(req.params.id));

  if (!exercise) {
    return res.status(404).send("Exercise not found");
  }

  res.json(exercise);
});

app.post("/exercises", (req, res) => {
  const exercise = req.body;

  exercices.push(exercise);

  res.status(201).json(exercise);
});

app.put("/exercises/:id", (req, res) => {
  const exercise = exercices.find((e) => e.id === parseInt(req.params.id));

  if (!exercise) {
    return res.status(404).send("Exercise not found");
  }

  const index = exercices.indexOf(exercise);

  exercices[index] = req.body;

  res.json(req.body);
});

export default app;

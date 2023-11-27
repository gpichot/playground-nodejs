# Fitomapp

Fitomapp is an api that helps you choose you exercises.

## Express

1. Create a new project with express:

```
mkdir fitomapp
cd fitomapp
npm init
npm add express
```

2. Add `"type": "module"` to package.json

3. Bootstrap the project:
   Create file src/app.js with the following content:

```javascript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
```

Create a file src/server.js with the following content:

```javascript
import app from "./app.js";

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

Add the following script to package.json:

```json
"scripts": {
  "dev": "node --watch src/server.js"
}
```

4. Add the following endpoints:

```text
GET /exercises: List all exercises
GET /exercises/:id : Get an exercise by id
POST /exercises : Create a new exercise
DELETE /exercises/:id : Delete an exercise by id
```

The endpoint `GET /exercises` should also filter exercices using a query
parameter `muscle`.

An exercise will have the following data model:

```typescript
interface Exercise {
  id: number;
  nom: string;
  muscles: string[];
  nombreRepetitions: number;
  charge?: number;
  difficulte: number;
  description: string;
}
```

For now store the exercises in memory by creating the following file
`src/db.js`

```javascript
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
```

## MongoDB & mongoose

1. Install mongodb and mongoose:

```
npm install  mongoose
```

2. Connect to your MongoDB and create a first model:

```javascript
import mongoose from "mongoose";

const client = await mongoose.connect("mongodb://localhost:27017/fitomapp");

const ExerciseSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  muscles: { type: [String], required: true },
  nombreRepetitions: { type: Number, required: true },
  difficulte: { type: Number, required: true },
  description: { type: String, required: true },
});

const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);

export default ExerciseModel;
```

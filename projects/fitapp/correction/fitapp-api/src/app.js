import express from "express";
import cors from "cors";

import exercisesRouter from "./routers/exercisesRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/exercises", exercisesRouter);

export default app;

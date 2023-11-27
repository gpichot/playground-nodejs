import express from "express";
import cors from "cors";

import exercisesRouter from "./routers/exercisesRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

export default app;

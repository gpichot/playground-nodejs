import express from "express";
import cors from "cors";

import exercisesRouter from "./routers/exercisesRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(express.json());
app.use(cors({}));

app.use(async function logRequest(req, res, next) {
  next();
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/pong", (req, res) => {
  const n = req.body.n;

  if (n % 2 === 0) {
    return res.send("pong");
  } else {
    return res.send("ping");
  }
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

export default app;

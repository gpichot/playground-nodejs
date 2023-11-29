import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import fs from "node:fs/promises";

import exercisesRouter from "./routers/exercisesRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(express.json());
app.use(cors({}));

app.use(async function logRequest(req, res, next) {
  next();
});

const swaggerDocument = parse(await fs.readFile("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

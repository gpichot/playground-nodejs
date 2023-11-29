import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import fs from "node:fs/promises";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./passport.js";

import exercisesRouter from "./routers/exercisesRouter.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors({}));
app.use(passport.initialize());
app.use(passport.session());

app.use(async function logRequest(req, res, next) {
  next();
});

const swaggerDocument = parse(await fs.readFile("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/ping", (req, res) => {
  console.log(req.cookies);
  if (req.session.views) req.session.views += 1;
  else req.session.views = 1;
  console.log({ session: req.session, user: req.user });
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

import bodyParser from "body-parser";
import cors from "cors";
import type { Handler } from "express";
import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { validateRequestParams } from "zod-express-middleware";

import passport from "./authentication/index";
import authRouter from "./authentication/routes";
import chatRouter from "./chat/routes";
import { fibonacci } from "./fibo";
import session from "./session";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

export const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(session);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const log: Handler = (req, res, next) => {
  // eslint-disable-next-line no-console
  const user = (req.session as any).passport?.user;
  if (user) {
    console.log(`[${user}]`, new Date(), req.method, req.url);
  } else {
    console.log(new Date(), req.method, req.url);
  }
  // Call next or chain is broken!
  next();
};

app.get("/*", log);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get(
  "/fibonacci/:n(\\d+)",
  validateRequestParams(
    z.object({
      n: z.preprocess((v: unknown) => Number(v), z.number().positive()),
    })
  ),
  (req, res) => {
    const { n } = req.params;
    res.send(fibonacci(n).toString());
  }
);

app.use("/", authRouter);
app.use("/messages", chatRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err);
});

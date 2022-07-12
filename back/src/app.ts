import express, { NextFunction, Request, Response } from "express";
import type { Handler } from "express";
import bodyParser from "body-parser";
// import cors from "cors";
import { fibonacci } from "./fibo";
import { z } from "zod";
import { validateRequestParams } from "zod-express-middleware";

export const app = express();

app.use(bodyParser.json());

const log: Handler = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(new Date(), req.method, req.url);
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err);
});

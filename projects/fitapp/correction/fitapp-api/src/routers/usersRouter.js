import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { z, object, string, array } from "zod";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import passport from "../passport.js";

const router = express.Router();

router.get("/", adminMiddleware, async (req, res) => {
  const users = await UserRepository.listUsers();
  res.json(users);
});

const UserCreationPayload = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().min(8),
});

const UserRegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/register", processRequestBody(UserRegisterSchema), (req, res) => {
  UserModel.register(
    new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: "User",
    }),
    req.body.password,
    (err, account) => {
      if (err) {
        console.error(err);
        return res.status(400).json(err);
      }

      passport.authenticate("local")(req, res, () => {
        res.status(201).send("Created");
      });
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Logged");
});

router.post("/", processRequestBody(UserCreationPayload), async (req, res) => {
  const payload = req.body;

  const user = await UserRepository.createUser({
    role: "User",
    ...payload,
  });

  res.status(201).json(user);
});

export default router;

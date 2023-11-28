import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { z, object, string, array } from "zod";
import { processRequestBody } from "zod-express-middleware";

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

router.post("/", processRequestBody(UserCreationPayload), async (req, res) => {
  const payload = req.body;

  const user = await UserRepository.createUser({
    role: "User",
    ...payload,
  });

  res.status(201).json(user);
});

export default router;

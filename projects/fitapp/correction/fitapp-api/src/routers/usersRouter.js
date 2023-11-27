import express from "express";
import UserRepository from "../repositories/UserRepository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await UserRepository.listUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const user = await UserRepository.createUser({
    role: "User",
    ...payload,
  });

  res.status(201).json(user);
});

export default router;

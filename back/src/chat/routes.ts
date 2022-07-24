import express from "express";
import { bus } from "@/bus";
import * as uuid from "uuid";

const router = express.Router();

const messages = [
  {
    id: "1",
    username: "user1",
    text: "Hello",
    sendAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    username: "user2",
    text: "World",
    sendAt: "2022-01-01T00:02:00.000Z",
  },
  { id: "3", username: "user3", text: "!", sendAt: "2022-01-01T00:03:00.000Z" },
];

router.get("/:room", (req, res) => {
  return res.json(messages);
});
router.post("/:room", (req, res) => {
  const body = req.body;
  const username = (req.user as any)?.username ?? "anonymous";
  const message = {
    id: uuid.v4(),
    username,
    text: body.text,
    sendAt: new Date().toISOString(),
  };
  messages.push(message);
  bus.emit("newMessage", message);
  return res.json(messages);
});

export default router;

import express from "express";
import * as uuid from "uuid";

import { bus } from "@/bus";
import db from "@/database";

const router = express.Router();

router.get("/rooms", async (req, res) => {
  const rooms = await db.collection("rooms").find({}).toArray();

  return res.json(rooms);
});

router.get("/:room", async (req, res) => {
  const messages = await db
    .collection("messages")
    .find({ room: req.params.room })
    .toArray();
  return res.json(messages);
});
router.post("/:room", async (req, res) => {
  const body = req.body;
  const username = (req.user as any)?.username ?? "anonymous";
  const message = {
    id: uuid.v4(),
    username,
    text: body.text,
    sendAt: new Date().toISOString(),
    room: req.params.room,
  };

  await db.collection("messages").insertOne(message);

  const messages = await db
    .collection("messages")
    .find({ room: req.params.room })
    .toArray();

  bus.emit("newMessage", message);
  return res.json(messages);
});

export default router;

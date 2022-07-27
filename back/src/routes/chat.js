import cors from "cors";
import express from "express";

import bus from "@/bus";
import db from "@/mongo";

const router = express.Router();
router.use(express.json());

router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

router.get("/rooms", async (req, res) => {
  //let rooms = [{ name: "room1" }, { name: "room2" }, { name: "room3" }];

  const rooms = await db.collection("rooms").find({}).toArray();
  res.json(rooms);
});

router.get("/:room", async (req, res) => {
  const myRoom = req.params.room;
  const messages = await db
    .collection("messages")
    .find({ room: myRoom })
    .toArray();
  res.json(messages);
});

router.post("/:room", async (req, res) => {
  const id = Math.ceil(Math.random() * 100000);
  const text = req.body.text;
  const date = new Date().toISOString();
  const myRoom = req.params.room;
  const message = {
    id: id,
    username: "anonymous",
    text: text,
    sendAt: date,
    room: myRoom,
  };

  await db.collection("messages").insertOne(message);

  const allMessages = await db
    .collection("messages")
    .find({ room: myRoom })
    .toArray();

  //socketServer.emit("message", message);
  bus.emit("message", message);

  res.json(allMessages);
});

export default router;

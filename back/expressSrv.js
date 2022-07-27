import cors from "cors";
import express from "express";
import fs from "fs";
import router from "src/routes/chat";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

app.get("/", (req, res) => {
  res.send(process.cwd());
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/fibonacci/:n(\\d+)", (req, res) => {
  let n = req.params.n;
  res.send(fibonacci(n).toString());
});

app.get("/file", (req, res) => {
  const input = fs.createReadStream("src/fileone.txt", "utf-8");
  input.pipe(res);
});

app.use("/chat", router);

/*app.get("./chat/rooms", (req, res) => {
  let rooms = [{ name: "room1" }, { name: "room2" }, { name: "room3" }];
  res.json(rooms);
});*/

export default app;

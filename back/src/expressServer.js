import express  from "express";
import cors from "cors";
import db from '@/mongo';

import { socketServer } from "./index";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true    
    }));
app.use(express.json());

function fibonacci(n){
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}

app.get("/", (req,res) => {
    res.write(fibonacci(5).toString());
    //res.set("hello", "bar");
    //res.write;
    res.end("hello worldy");
});

app.get("/ping", (req,res) => {
    res.send("pong");
});

app.get(`/fibonacci/:n(\\d+)`,(req,res) =>{
    const n = req.params.n;
    res.send(`nbre fibonacci: ${n}`);
});

app.get(`/chat/rooms`, async (req,res) => {
    //res.json([{name:"main"},{name:"room2"}]);
    const rooms = await db.collection('rooms').find({}).toArray();
    return res.json(rooms);
});

app.get(`/chat/:rooms`, async (req,res) =>{
    const roomParam = req.params.rooms;
    const messages = await db.collection('messages').find({ room: roomParam }).toArray();
    return res.json(messages);
    
});

app.post(`/chat/:rooms`, async (req,res) =>{
    const roomParam = req.params.rooms;
    const recupBody = req.body.text;
    const date = new Date().toISOString()
    const messages={
        id: Math.ceil(Math.random() * 100000), // Math.ceil(Math.random() * 100000) ou `uuid.v4()` avec le paquet uuid (import * as uuid from "uuid";)
        username: "anonymous2", // "anonymous" par default
        text: recupBody, // Le texte envoyé par l'utilisateur
        sendAt: date , // La date en ISO: new Date().toISOString()
        room: roomParam // La room sur laquelle le message est envoyé
    }
    //envoyer le message en base
    await db.collection('messages').insertOne(messages)
    //
    const messages2 = await db.collection('messages').find({ room: roomParam }).toArray();
    //socket emit
    socketServer.emit("message",messages);

    return res.json(messages2);
});


export default app;



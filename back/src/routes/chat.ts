import express, {Request, Response, Router} from "express"
import bus from "src/bus"
import db from "src/services/mongoClient"
import * as uuid from "uuid"

const router: Router = express.Router()

const rooms: Array<object> = [
    {name: "room1"},
    {name: "room2"},
    {name: "room3"}
]


router.get(`/rooms`, async (req: Request, res: Response) => {
    const rooms = await db.collection('rooms').find({}).toArray()
    res.json(rooms)
})

router.get(`/:room`, async (req: Request, res: Response) => {
    const roomName = req.params.room
    const messages = await db.collection('messages').find({"room": roomName}).toArray()
    res.json(messages)
})

router.post(`/:room`, async (req: Request, res: Response) => {
    const room = req.params.room
    const text = req.body.text // { text: "pokeball"}
    const message = {
        id: uuid.v4(),
        username: "anonymous",
        text, // text: "pokeball"
        sendAt: new Date().toISOString(),
        room // room: room
    }
    await db.collection('messages').insertOne(message)
    const messages = await db.collection('messages').find({room}).toArray()
    bus.emit('message', message)
    console.log("message", message)
    res.json(messages)
})

export default router
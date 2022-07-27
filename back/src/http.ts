import cors from 'cors'
import express, {Express, Request, Response} from 'express'

import chatRouter from './routes/chat'
import fibonacci from './utils/fibonacci'
import readFile from './utils/readFile'

const app: Express = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(express.json())

app.use('/chat', chatRouter)

app.get('/ping', (req: Request, res: Response) => {
    res.send("pong")
})

app.get('/fibonacci/:n', (req: Request, res: Response) => {
    const n = Number(req.params.n)
    res.send(fibonacci(n).toString())
})

app.get('/file', async (req: Request, res: Response) => {
    const readStream = readFile('one.txt')
    readStream.pipe(res);
})


export default app;
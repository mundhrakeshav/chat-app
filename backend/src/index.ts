import express, { Request, Response, Express } from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
dotenv.config()
const prisma = new PrismaClient()

const app: Express = express()

app.use(cors({
    origin: process.env.ORIGIN_URL,
}))

app.get("/", async (req: Request, res: Response) => {    
    await prisma.$connect()
    const data = await prisma.user.findMany()
    const dataN = await prisma.user.create({
        data: {
            name: "Kehsav",
            email: "hhfjhsadjfhj",
            password: "Keshav"
        }
    })
    console.log(data, dataN);
    return res.send("Hey")
    
})

app.get("/chats", (req: Request, res: Response) => {    
    return res.send("Hey")
})

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
    
})
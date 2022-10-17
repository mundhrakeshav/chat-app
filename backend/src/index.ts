import express, { Request, Response, Express } from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import prismaClient from "./prismaClient";
import { userRouter } from "./routes";

dotenv.config()

const app: Express = express()

app.use(cors({
    origin: process.env.ORIGIN_URL,
}))
app.use(express.json())
// app.get("/", async (req: Request, res: Response) => {    
//     return res.send("Hey")
    
// })

app.use("/api/user", userRouter);

// app.get("/chats", (req: Request, res: Response) => {    
//     return res.send("Hey")
// })

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, async () => {
    await prismaClient.$connect();
    console.log(`Server started on port ${PORT} 🚀`);
})
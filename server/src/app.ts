require("module-alias/register")
import express from "express"
import routes from "./routes"
import cors from "cors"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"
import config from "config"
import deserializeUser from "@middleware/deserializeUser"
import fileUpload from "express-fileupload"
import { Server } from "socket.io"
import { createServer } from "http"
dotenv.config()
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const app = express()
app.use(cookieParser())
app.use(fileUpload())

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: config.get("origin"),
        credentials: true,
    },
})

interface ReceivedMsgProps {
    msg: string
    user: string
    time: string
}

io.on("connection", (socket) => {
    console.log(`Connected at ${socket.id}`)

    socket.on("join_room", async (name: string, roomId: string) => {
        socket.join(roomId)

        // socket.to(roomId).emit("receive_msg", {
        //     msg: `${name} have joined the room`,
        //     user: "chatbot",
        //     time: Date.now(),
        // })

        const chat = await prisma.chat.findMany({
            where: {
                roomId,
            },
        })

        // const updatedData = JSON.stringify(chat, (_key, value) => {
        //     typeof value === "bigint" ? (value = value.toString()) : value
        // })

        socket.emit("previous_msg", chat)
    })

    socket.on(
        "send_msg",
        async ({ msg, time, user }: ReceivedMsgProps, roomId: string) => {
            // store in db
            const chat = await prisma.chat.create({
                data: {
                    msg,
                    time,
                    user,
                    roomId,
                },
            })

            console.log(chat)

            io.to(roomId).emit("receive_msg", {
                msg,
                user,
                time,
            })
        }
    )
})

app.use(
    cors({
        origin: config.get("origin"),
        credentials: true,
    })
)
app.use(express.json())
const PORT = config.get<number>("port")

app.use(deserializeUser)

httpServer.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)

    routes(app)
})

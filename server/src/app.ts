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
dotenv.config()

const app = express()
app.use(cookieParser())
app.use(fileUpload())

app.use(
    cors({
        origin: config.get("origin"),
        credentials: true,
    })
)
app.use(express.json())
const PORT = config.get<number>("port")

app.use(deserializeUser)

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)

    routes(app)
})

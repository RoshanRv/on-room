require("module-alias/register")
import express from "express"
import routes from "./routes"
import cors from "cors"
import * as dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
)
app.use(express.json())
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)

    routes(app)
})

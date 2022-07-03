import cors from "cors"
import express from "express"
import { advicesRouter } from "./routes/advices"

const app = express()

app.use(cors())

app.use(express.json())

app.use('/advices', advicesRouter)

export { app }
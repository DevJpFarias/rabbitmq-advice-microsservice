import 'reflect-metadata'
import { config } from "dotenv"
import { app } from "./app"
import { PostgresDB } from "../typeorm/connection"
import AdviceMessageChannel from "../../../messages/AdviceMessageChannel"

const createServer = async () => {
  config()

  const connection = await PostgresDB.initialize()
  const verification = connection.isInitialized
  const server = app.listen(7878, () => console.log('Server started in port 7878'))

  const adviceMessageChannel = new AdviceMessageChannel(server)
  adviceMessageChannel.consumeMessages()

  process.on('SIGINT', async () => {
    await connection.destroy()
    server.close()
    console.log('Server and connection to Postgres closed')
  })
}

createServer()

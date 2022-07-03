import { Channel, connect } from "amqplib"
import { config } from "dotenv"
import { Server } from "socket.io"
import * as http from 'http'
import { AdvicesRepository } from "../modules/advices/infra/typeorm/repositories/AdvicesRepository"

config()

export default class AdviceMessageChannel {
  private channel: Channel
  private advicesRepository: AdvicesRepository
  private io: Server

  constructor(server: http.Server) {
    this.advicesRepository = new AdvicesRepository()
    this.io = new Server(server, {
      cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
      }
    })
    this.io.on('connection', () => console.log('Web socket connection created'))
  }

  private async createMessageChannel() {
    try {
      const connection = await connect(process.env.AMQP_SERVER)
      this.channel = await connection.createChannel()
      this.channel.assertQueue(process.env.QUEUE_NAME)
    } catch (error) {
      console.log('Connection to RabbitMQ failed')
      console.log(error)
    }
  }

  async consumeMessages() {
    await this.createMessageChannel()
    if(this.channel) {
      this.channel.consume(process.env.QUEUE_NAME, async msg => {
        const adviceObj = JSON.parse(msg.content.toString())
        console.log('Message received')
        console.log(adviceObj)
        this.channel.ack(msg)
  
        const advice: string = adviceObj
        await this.advicesRepository.save(advice)
        console.log('Candle saved to database')
        this.io.emit(process.env.SOCKET_EVENT_NAME, advice)
        console.log('New candle emitted by web socket')
      })
  
      console.log('Candle consumer started')
    }
  }
}
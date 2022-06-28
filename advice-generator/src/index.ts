import axios from 'axios'
import { config } from 'dotenv'
import cron from 'node-cron'
import { createMessageChannel } from './messages/messageChannel';

config()

//cron.schedule('0 9 * * *', async () ={...}, {scheduled: true, timezone: "America/Sao_Paulo" }) = Roda toda 9:00 no horário de São Paulo

//cron.schedule('*/10 * * * * *', async () ={...}, {scheduled: true, timezone: "America/Sao_Paulo" }) = Roda a cada 10 segundos do horário de São Paulo

//cron.schedule('10 * * * * *', async () ={...}, {scheduled: true, timezone: "America/Sao_Paulo" }) = Roda toda vez que o segundo da hora for 10 (9:10, 10:10. ...) do horário de São Paulo

cron.schedule('* * * * *', async () => {
  const readAdvice = async (): Promise<string> => {
    const result = await axios.get(process.env.ADVICE_API)
    const data = await result.data
    const slip = await data.slip
    const advice = await slip.advice
    return advice
  }

  const generateAdvices = async () => {
    const messageChannel = await createMessageChannel()

    const advice = await readAdvice()

    const adviceJson = JSON.stringify(advice)
    messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(adviceJson))
    console.log('Advice sent to queue')
  }

  generateAdvices()
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
})

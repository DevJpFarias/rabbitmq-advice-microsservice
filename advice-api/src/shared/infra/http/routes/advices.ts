import { Router } from "express"
import { AdvicesRepository } from "../../../../modules/advices/infra/typeorm/repositories/AdvicesRepository"
import ShowLastAdvicesService from "../../../../modules/advices/services/ShowLastAdvicesService"


export const advicesRouter = Router()
const advicesRepository = new AdvicesRepository()
const showLastAdvicesService = new ShowLastAdvicesService(advicesRepository)

advicesRouter.get('/:quantity', async (request, response) => {
  const quantity = parseInt(request.params.quantity)
  const lastCandles = await showLastAdvicesService.execute(quantity)

  return response.json(lastCandles)
})
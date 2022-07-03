import { container } from "tsyringe"
import { AdvicesRepository } from "../../modules/advices/infra/typeorm/repositories/AdvicesRepository"
import { IAdvicesRepository } from "../../modules/advices/repositories/IAdvicesRepository"

container.registerSingleton<IAdvicesRepository>(
  'AdvicesRepository',
  AdvicesRepository
)
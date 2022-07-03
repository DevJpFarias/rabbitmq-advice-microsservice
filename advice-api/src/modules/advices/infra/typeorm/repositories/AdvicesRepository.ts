import { Repository } from "typeorm";
import { PostgresDB } from "../../../../../shared/infra/typeorm/connection";
import { Advice } from "../entities/Advice";
import { IAdvicesRepository } from "../../../repositories/IAdvicesRepository"

export class AdvicesRepository implements IAdvicesRepository {
  private ormRepository: Repository<Advice>

  constructor () {
    this.ormRepository = PostgresDB.getRepository(Advice)
  }

  async save (advice: string): Promise<Advice> {
    const adviceCreation = this.ormRepository.create({
      description: advice
    })

    await this.ormRepository.save(adviceCreation)

    return adviceCreation
  }

  async showLastAdvices (quantity: number): Promise<Advice[]> {
    const n = quantity > 0 ? quantity : 10

    const advices = await this.ormRepository.find({
      take: n,
      order: {
        created_at: 'DESC'
      }
    })

    return advices
  }
}
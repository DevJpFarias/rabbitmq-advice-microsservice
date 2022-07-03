import { inject, injectable } from "tsyringe";
import { Advice } from "../infra/typeorm/entities/Advice";
import { IAdvicesRepository } from "../repositories/IAdvicesRepository";

@injectable()
export default class CreateAdviceService {
  constructor(
    @inject('AdvicesRepository')
    private advicesRepository: IAdvicesRepository
  ) {}

  async execute(advice: string): Promise<Advice> {
    const adviceCreation = await this.advicesRepository.save(advice)

    return adviceCreation
  }
}
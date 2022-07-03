import { inject, injectable } from "tsyringe";
import { Advice } from "../infra/typeorm/entities/Advice";
import { IAdvicesRepository } from "../repositories/IAdvicesRepository";

@injectable()
export default class ShowLastAdvicesService {
  constructor(
    @inject('AdvicesRepository')
    private advicesRepository: IAdvicesRepository
  ) {}

  async execute(quantity: number): Promise<Advice[]> {
    const advices = await this.advicesRepository.showLastAdvices(quantity)

    return advices
  }
}
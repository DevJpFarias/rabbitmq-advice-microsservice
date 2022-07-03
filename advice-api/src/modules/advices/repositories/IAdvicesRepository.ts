import { Advice } from "../infra/typeorm/entities/Advice";

export interface IAdvicesRepository {
  save(advice: string): Promise<Advice>
  showLastAdvices(quantity: number): Promise<Advice[]>
}
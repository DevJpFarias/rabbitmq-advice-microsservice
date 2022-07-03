import { DataSource } from 'typeorm'
import { Advice } from '../../../../modules/advices/infra/typeorm/entities/Advice'

export const PostgresDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'advices-database',
  entities: [
    Advice
  ],
  migrations: [
    './src/shared/infra/typeorm/migrations/*.ts'
  ],
  synchronize: true
})
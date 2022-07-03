import { DataSource } from 'typeorm'
import { PostgresDB } from '../infra/typeorm/connection'

interface IDatabase {
	[key: string]: DataSource
}

const databases: IDatabase = {
	prod: PostgresDB,
}

const environment = process.env.NODE_ENV || 'prod'

export const database = databases[environment]
import { APICountry } from '@/domain/country/dto/ApiGetCountries'
import { PostgresAdapter } from '../database/postgresAdapter'
export type convertGradeParams = {
  evaluationSystemID: string
  grade: number
  direction?: string
}
export interface DatabaseAdapter {
  getCountries(): Promise<APICountry[]>
  convertGrade(params: convertGradeParams): Promise<string>
}

export function createDatabaseAdapter(): DatabaseAdapter {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new PostgresAdapter(connectionString)
}

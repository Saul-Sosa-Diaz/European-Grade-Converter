import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { PostgresAdapter } from '../database/postgresAdapter'
import { EvaluationType } from '@/domain/country/country'

export enum ConverterDirection {
  toSpain = 'toSpain',
}

export type convertGradeParams = {
  evaluationSystemID: string
  evaluationType: EvaluationType
  grade: number
  direction?: ConverterDirection
}
export interface DatabaseAdapter {
  getCountryList(): Promise<APICountry[]>
  getCountryWithEvaluationInfoList(): Promise<APICountryWithEvaluationInfo[]>
  updateCountry(country: APICountry): Promise<void>
  createCountry(country: APICountry): Promise<void>
  convertGrade(params: convertGradeParams): Promise<number>
  deleteCountry(country: APICountry): Promise<void>
}

export function createDatabaseAdapter(): DatabaseAdapter {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new PostgresAdapter(connectionString)
}

import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { PostgresAdapter } from '../database/postgres/postgresAdapter'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'

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
  getUniversityList(): Promise<APIUniversity[]>
  updateUniversity(university: APIUniversity): Promise<void>
  createUniversity(university: APIUniversity): Promise<void>
  deleteUniversity(university: APIUniversity): Promise<void>
}

export function createDatabaseAdapter(): DatabaseAdapter {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new PostgresAdapter(connectionString)
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the configuration for the database adapter.
 * It defines the interfaces for the repositories and the function to create a new instance of the database adapter.
 *
 * @date February 18, 2025
 * @description This file has the configuration for the database adapter.
 * @author Saul Sosa
 */

import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'
import {
  APIGradeConversion,
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { User } from '@/domain/auth/auth'
import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { postgresAdapter } from '../database/postgres/postgresAdapter'
import { ConverterDirection } from '@/domain/converter/converter'

export type convertGradeParams = {
  evaluationSystemID: string
  evaluationType: EvaluationType
  grade: number
  direction?: ConverterDirection
}

export interface DBUniversityRepository {
  getUniversityList(): Promise<APIUniversity[]>
  updateUniversity(university: APIUniversity): Promise<void>
  createUniversity(university: APIUniversity): Promise<void>
  deleteUniversity(university: APIUniversity): Promise<void>
}

export interface DBCountryRepository {
  getCountryList(): Promise<APICountry[]>
  getCountryWithEvaluationInfoList(): Promise<APICountryWithEvaluationInfo[]>
  updateCountry(country: APICountry): Promise<void>
  createCountry(country: APICountry): Promise<void>
  deleteCountry(country: APICountry): Promise<void>
}

export interface DBEvaluationSystemRepository {
  getEvaluationSystemList(): Promise<APIEvaluationSystem[]>
  getGradeConversionListByEvaluationID(evaluationSystemID: string): Promise<APIGradeConversion[]>
  updateEvaluationSystem(evaluationSystem: APIEvaluationSystemWithGradeConversions): Promise<void>
  createEvaluationSystem(evaluationSystem: APIEvaluationSystemWithGradeConversions): Promise<void>
  deleteEvaluationSystem(evaluationSystem: APIEvaluationSystem): Promise<void>
}
export interface DBAuthRepository {
  verifyUser(username: string, password: string): Promise<User>
  logUserActivity(username: string, date: Date, operation: string): Promise<void>
}

export interface DBConverterRepository {
  getGradeConversions: (params: convertGradeParams) => Promise<APIGradeConversion>
}

export interface DatabaseAdapter {
  getDBCountryRepository(): DBCountryRepository
  getDBUniversityRepository(): DBUniversityRepository
  getDBEvaluationSystemRepository(): DBEvaluationSystemRepository
  getdbAuthRepository(): DBAuthRepository
  getDBConverterRepository(): DBConverterRepository
}

/**
 * Creates and returns a new instance of the database adapter.
 *
 * This function reads the database connection string from the environment variable `DATABASE_URL`.
 * If the environment variable is not set, it defaults to a local PostgreSQL connection string.
 *
 * @returns {DatabaseAdapter} An instance of the database adapter.
 */
export function createDatabaseAdapter(): DatabaseAdapter {
  const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db'
  return new postgresAdapter(connectionString)
}

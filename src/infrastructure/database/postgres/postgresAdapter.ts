/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the PostgreSQL adapter.
 * It initializes the repositories for country, university, evaluation system, authentication, and grade conversion.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the PostgreSQL adapter.
 * @author Saul Sosa
 */

import { Pool } from 'pg'
import { DatabaseAdapter } from '../../config/databaseConfig'
import { PostgresCountryRepository } from './dbCountryRepository'
import { PostgresUniversityRepository } from './dbUniversityRepository'
import { PostgresEvaluationSystemRepository } from './dbEvaluationSystemRepository'
import { PostgresAuthRepository } from './dbAuthRepository'
import { PostgresConverterRepository } from './dbConverterRepository'

export class postgresAdapter implements DatabaseAdapter {
  private pool: Pool
  private dbCountryRepository: PostgresCountryRepository
  private dbUniversityRepository: PostgresUniversityRepository
  private dbEvaluationSystemRepository: PostgresEvaluationSystemRepository
  private dbAuthRepository: PostgresAuthRepository
  private dbConverterRepository: PostgresConverterRepository

  constructor(connectionString: string) {
    this.pool = new Pool({ connectionString })
    this.dbCountryRepository = new PostgresCountryRepository(this.pool)
    this.dbUniversityRepository = new PostgresUniversityRepository(this.pool)
    this.dbEvaluationSystemRepository = new PostgresEvaluationSystemRepository(this.pool)
    this.dbAuthRepository = new PostgresAuthRepository(this.pool)
    this.dbConverterRepository = new PostgresConverterRepository(this.pool)
  }

  getDBCountryRepository() {
    return this.dbCountryRepository
  }
  getDBUniversityRepository() {
    return this.dbUniversityRepository
  }
  getDBEvaluationSystemRepository() {
    return this.dbEvaluationSystemRepository
  }
  getdbAuthRepository() {
    return this.dbAuthRepository
  }
  getDBConverterRepository() {
    return this.dbConverterRepository
  }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the university repository for PostgreSQL.
 * It defines the methods for retrieving, updating, creating, and deleting universities.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the university repository for PostgreSQL.
 * @author Saul Sosa
 */

import { Pool } from 'pg'
import { universityQueries } from './queries/universityQueries'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { DBUniversityRepository } from '@/infrastructure/config/databaseConfig'

export class PostgresUniversityRepository implements DBUniversityRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async getUniversityList(): Promise<APIUniversity[]> {
    const QUERY = universityQueries.GET_UNIVERSITY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APIUniversity[])
  }

  async updateUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.UPDATE_UNIVERSITY
    const VALUES = [university.universityid, university.universityname, university.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async deleteUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.DELETE_UNIVERSITY
    const VALUES = [university.universityid]
    await this.pool.query(QUERY, VALUES)
  }

  async createUniversity(university: APIUniversity): Promise<void> {
    const QUERY = universityQueries.CREATE_UNIVERSITY
    const VALUES = [university.universityname, university.countryid]
    await this.pool.query(QUERY, VALUES)
  }
}

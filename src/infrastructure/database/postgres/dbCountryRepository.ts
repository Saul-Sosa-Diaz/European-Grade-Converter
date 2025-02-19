/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the country repository for PostgreSQL.
 * It defines the methods for retrieving, updating, creating, and deleting countries, as well as fetching countries with evaluation information.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the country repository for PostgreSQL.
 * @author Saul Sosa
 */

import { Pool } from 'pg'
import { COUNTRY_QUERIES } from './queries/countryQueries'
import { APICountry, APICountryWithEvaluationInfo } from '@/domain/country/dto/ApiCountry'
import { DBCountryRepository } from '@/infrastructure/config/databaseConfig'

export class PostgresCountryRepository implements DBCountryRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async updateCountry(country): Promise<void> {
    const QUERY = COUNTRY_QUERIES.UPDATE_COUNTRY
    const VALUES = [country.countryid, country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async createCountry(country: APICountry): Promise<void> {
    const QUERY = COUNTRY_QUERIES.CREATE_COUNTRY
    const VALUES = [country.countrycode, country.countryname]
    await this.pool.query(QUERY, VALUES)
  }

  async deleteCountry(country: APICountry): Promise<void> {
    const QUERY = COUNTRY_QUERIES.DELETE_COUNTRY
    const VALUES = [country.countryid]
    await this.pool.query(QUERY, VALUES)
  }

  async getCountryList(): Promise<APICountry[]> {
    const QUERY = COUNTRY_QUERIES.GET_COUNTRY_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountry[])
  }

  async getCountryWithEvaluationInfoList(): Promise<APICountryWithEvaluationInfo[]> {
    const QUERY = COUNTRY_QUERIES.GET_COUNTRY_WITH_EVALUATION_INFO_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APICountryWithEvaluationInfo[])
  }
}

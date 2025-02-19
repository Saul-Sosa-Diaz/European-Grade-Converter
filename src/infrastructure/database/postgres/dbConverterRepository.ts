/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the grade conversion repository for PostgreSQL.
 * It defines the methods for converting grades between different evaluation systems.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the grade conversion repository for PostgreSQL.
 * @author Saul Sosa
 */

import { Pool } from 'pg'
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'
import { convertGradeParams, DBConverterRepository } from '@/infrastructure/config/databaseConfig'
import { ConverterDirection } from '@/domain/converter/converter'
import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { CONVERTER_QUERIES } from './queries/converterQueries'

export class PostgresConverterRepository implements DBConverterRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }
  async getGradeConversions({
    evaluationSystemID,
    evaluationType,
    grade,
    direction,
  }: convertGradeParams): Promise<APIGradeConversion> {
    if (evaluationType === EvaluationType.CONTINUOUS) {
      return this.getContinuousGradeConvert({ evaluationSystemID, grade, direction })
    } else {
      return this.getDiscteteGradeConversion({ evaluationSystemID, grade, direction })
    }
  }

  private async getContinuousGradeConvert({ evaluationSystemID, grade, direction }) {
    const gradeNumber = Number(grade)
    if (isNaN(gradeNumber)) {
      // if the grade is not a number, it means that is a special grade like 30L in Italy or Matricula de Honor in Spain
      return this.getDiscteteGradeConversion({
        evaluationSystemID,
        grade,
        direction,
      })
    }

    const QUERY =
      direction === ConverterDirection.toSpain
        ? CONVERTER_QUERIES.COUNTINUOUS_TO_SPAIN
        : CONVERTER_QUERIES.COUNTINUOUS_FROM_SPAIN

    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)
    if (rows.length === 0) {
      // It could be a special grade that has another conversion
      return this.getDiscteteGradeConversion({ evaluationSystemID, grade, direction })
    }

    const conversion = rows[0]
    return conversion
  }

  private async getDiscteteGradeConversion({ evaluationSystemID, grade, direction }) {
    const QUERY =
      direction === ConverterDirection.toSpain
        ? CONVERTER_QUERIES.DISCRETE_TO_SPAIN
        : CONVERTER_QUERIES.DISCRETE_FROM_SPAIN
    const VALUES = [evaluationSystemID, grade]
    const { rows } = await this.pool.query(QUERY, VALUES)
    if (rows.length === 0) {
      throw new Error('No conversion found')
    }
    const conversion = rows[0]
    return conversion
  }
}

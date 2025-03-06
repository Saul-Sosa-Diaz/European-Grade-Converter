/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the evaluation system repository for PostgreSQL.
 * It defines the methods for retrieving, updating, creating, and deleting evaluation systems and grade conversions.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the evaluation system repository for PostgreSQL.
 * @author Saul Sosa
 */

import { Pool } from 'pg'
import {
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
  APIGradeConversion,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EVALUATION_SYSTEM_QUERIES } from './queries/evaluationSystemQueries'
import { EuropeanEquivalence } from '@/domain/evaluationSystem/evaluationSystem'
import { DBEvaluationSystemRepository } from '@/infrastructure/config/databaseConfig'

export class PostgresEvaluationSystemRepository implements DBEvaluationSystemRepository {
  private pool: Pool
  private spanishEquivalent: Map<EuropeanEquivalence, { base: number; top: number }>
  constructor(pool: Pool) {
    this.pool = pool
    this.spanishEquivalent = new Map<EuropeanEquivalence, { base: number; top: number }>([
      [EuropeanEquivalence.F, { base: 0, top: 5 }],
      [EuropeanEquivalence.FX, { base: 4.5, top: 5 }],
      [EuropeanEquivalence.E, { base: 5, top: 6 }],
      [EuropeanEquivalence.D, { base: 6, top: 7 }],
      [EuropeanEquivalence.C, { base: 7, top: 8 }],
      [EuropeanEquivalence.B, { base: 8, top: 9 }],
      [EuropeanEquivalence.A, { base: 9, top: 10 }],
    ])
  }

  async getEvaluationSystemList() {
    const QUERY = EVALUATION_SYSTEM_QUERIES.GET_EVALUATION_SYSTEM_LIST
    return this.pool.query(QUERY).then((result) => result.rows as APIEvaluationSystem[])
  }

  async getGradeConversionListByEvaluationID(evaluationSystemID: string) {
    const QUERY = EVALUATION_SYSTEM_QUERIES.GET_CONTINUOUS_GRADE_CONVERSION_LIST_BY_EVALUATION_ID
    const VALUES = [evaluationSystemID]
    // Get continuous grade conversions
    const continuousGradeConversion = this.pool
      .query(QUERY, VALUES)
      .then((result) => result.rows as APIGradeConversion[])
    // Get discrete grade conversions
    const DISCRETE_QUERY =
      EVALUATION_SYSTEM_QUERIES.GET_DISCRETE_GRADE_CONVERSION_LIST_BY_EVALUATION_ID
    const discreteGradeConversion = this.pool
      .query(DISCRETE_QUERY, VALUES)
      .then((result) => result.rows as APIGradeConversion[])
    // Return both continuous and discrete grade conversions because there are countries like italy that have both types of grade conversions
    return Promise.all([continuousGradeConversion, discreteGradeConversion]).then(
      ([continuous, discrete]) => [...continuous, ...discrete] as APIGradeConversion[],
    )
  }

  async updateEvaluationSystem(
    evaluationSystem: APIEvaluationSystemWithGradeConversions,
  ): Promise<void> {
    const QUERY = EVALUATION_SYSTEM_QUERIES.UPDATE_EVALUATION_SYSTEM
    const VALUES = [
      evaluationSystem.evaluationsystemname,
      evaluationSystem.universityid,
      evaluationSystem.validgrades,
      evaluationSystem.evaluationtype,
      evaluationSystem.fixed,
      evaluationSystem.evaluationsysteminfo,
      evaluationSystem.urltoevidence,
      evaluationSystem.evaluationsystemid,
    ]
    // Update evaluation system
    await this.pool.query(QUERY, VALUES)
    // Update associated grade conversions
    await Promise.all(
      evaluationSystem.gradeconversions.map((gradeConversion, index) => {
         const equivalenceData = this.spanishEquivalent.get(gradeConversion.europeanequivalence)
         const baseEquivalentSpanishGrade = equivalenceData.base
         let topEquivalentSpanishGrade = equivalenceData.top
         for (let i = index + 1; i < evaluationSystem.gradeconversions.length; i++) {
           const nextConversion = evaluationSystem.gradeconversions[i]
           if (
             nextConversion.gradevalue ||
             nextConversion.minintervalgrade ||
             nextConversion.maxintervalgrade
           ) {
             topEquivalentSpanishGrade = this.spanishEquivalent.get(
               nextConversion.europeanequivalence,
             ).base
             break
           }
         }
        // Update the grade conversion depending on the type of grade conversion (discrete or continuous)
        if (gradeConversion.gradevalue) {
          // discrete
          const DISCRETE_GRADE_CONVERSION = [
            gradeConversion.gradevalue,
            baseEquivalentSpanishGrade,
            topEquivalentSpanishGrade,
            gradeConversion.gradeconversionid,
          ]
          return this.pool.query(
            EVALUATION_SYSTEM_QUERIES.UPDATE_DISCRETE_GRADE_CONVERSION,
            DISCRETE_GRADE_CONVERSION,
          )
        } else {
          // continuous
          const GRADE_CONVERSION_VALUES = [
            gradeConversion.minintervalgrade,
            gradeConversion.maxintervalgrade,
            gradeConversion.gradename,
            baseEquivalentSpanishGrade,
            topEquivalentSpanishGrade,
            gradeConversion.gradeconversionid,
          ]
          return this.pool.query(
            EVALUATION_SYSTEM_QUERIES.UPDATE_CONTINUOUS_GRADE_CONVERSION,
            GRADE_CONVERSION_VALUES,
          )
        }
      }),
    )
  }

  async createEvaluationSystem(
    evaluationSystem: APIEvaluationSystemWithGradeConversions,
  ): Promise<void> {
    const QUERY = EVALUATION_SYSTEM_QUERIES.CREATE_EVALUATION_SYSTEM
    const VALUES = [
      evaluationSystem.evaluationsystemname,
      evaluationSystem.universityid,
      evaluationSystem.validgrades,
      evaluationSystem.evaluationtype,
      evaluationSystem.fixed,
      evaluationSystem.evaluationsysteminfo,
      evaluationSystem.urltoevidence,
    ]
    // Create evaluation system
    const newEvaluationSystemId = (await this.pool.query(QUERY, VALUES)).rows[0].evaluationsystemid
    // Create associated grade conversions
    await Promise.all(
      evaluationSystem.gradeconversions.map((gradeConversion, index) => {
         const equivalenceData = this.spanishEquivalent.get(gradeConversion.europeanequivalence)
         const baseEquivalentSpanishGrade = equivalenceData.base
         let topEquivalentSpanishGrade = equivalenceData.top
         for (let i = index + 1; i < evaluationSystem.gradeconversions.length; i++) {
           const nextConversion = evaluationSystem.gradeconversions[i]
           // If the next conversion is a grade value or a grade interval, then the top equivalent spanish grade is the base of the next conversion
           if (
             nextConversion.gradevalue ||
             nextConversion.minintervalgrade ||
             nextConversion.maxintervalgrade
           ) {
             topEquivalentSpanishGrade = this.spanishEquivalent.get(
               nextConversion.europeanequivalence,
             ).base
             break
           }
         }
        if (
          // Care with this condition because it is not clear, when minIntervalGrade is 0 it is false and it should be true because of that I added the !== null
          (gradeConversion.gradevalue !== null && gradeConversion.gradevalue !== '') ||
          (gradeConversion.minintervalgrade !== null &&
            gradeConversion.minintervalgrade !== '' &&
            gradeConversion.maxintervalgrade !== null &&
            gradeConversion.maxintervalgrade !== '')
        ) {

          if (gradeConversion.gradevalue) {
            const GRADE_DISCRETE_CONVERSION_VALUES = [
              newEvaluationSystemId,
              gradeConversion.gradevalue,
              baseEquivalentSpanishGrade,
              topEquivalentSpanishGrade,
              gradeConversion.europeanequivalence,
            ]
            return this.pool.query(
              EVALUATION_SYSTEM_QUERIES.CREATE_DISCRETE_GRADE_CONVERSION,
              GRADE_DISCRETE_CONVERSION_VALUES,
            )
            
          } else {
            const GRADE_CONTINUOUS_CONVERSION_VALUES = [
              newEvaluationSystemId,
              gradeConversion.minintervalgrade,
              gradeConversion.maxintervalgrade,
              gradeConversion.gradename,
              baseEquivalentSpanishGrade,
              topEquivalentSpanishGrade,
              gradeConversion.europeanequivalence,
            ]
            return this.pool.query(
              EVALUATION_SYSTEM_QUERIES.CREATE_CONTINUOUS_GRADE_CONVERSION,
              GRADE_CONTINUOUS_CONVERSION_VALUES,
            )
          }
        }
      }),
    )
  }

  async deleteEvaluationSystem(evaluationSystem: APIEvaluationSystem): Promise<void> {
    const QUERY = EVALUATION_SYSTEM_QUERIES.DELETE_EVALUATION_SYSTEM
    const VALUES = [evaluationSystem.evaluationsystemid]
    await this.pool.query(EVALUATION_SYSTEM_QUERIES.DELETE_CONTINUOUS_GRADE_CONVERSION, VALUES)
    await this.pool.query(EVALUATION_SYSTEM_QUERIES.DELETE_DISCRETE_GRADE_CONVERSION, VALUES)
    await this.pool.query(QUERY, VALUES)
  }
}

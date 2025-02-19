/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildGradeConversionListByEvaluationIDMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping APIGradeConversion to GradeConversion correctly,
 * handling empty input arrays, and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildGradeConversionListByEvaluationIDMap function.
 * @author Saul Sosa
 */

import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EuropeanEquivalence, GradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

/**
 * Builds a list of GradeConversion objects from a given array of APIGradeConversion objects.
 *
 * @param dto - An array of APIGradeConversion objects to be converted.
 * @returns A promise that resolves to an array of GradeConversion objects.
 * @throws Will throw an error if the conversion process fails.
 */
export const buildGradeConversionListByEvaluationIDMap = async (
  dto: APIGradeConversion[],
): Promise<GradeConversion[]> => {
  try {
    const gradeConversionList: GradeConversion[] = dto.map(
      (gardeConversion: APIGradeConversion) => {
        return {
          gradeConversionID: gardeConversion.gradeconversionid,
          evaluationSystemID: gardeConversion.evaluationsystemid,
          MinIntervalGrade: gardeConversion.minintervalgrade,
          MaxIntervalGrade: gardeConversion.maxintervalgrade,
          gradeName: gardeConversion.gradename,
          gradeValue: gardeConversion.gradevalue,
          europeanEquivalence: gardeConversion.europeanequivalence as EuropeanEquivalence,
        }
      },
    )
    return gradeConversionList
  } catch (error) {
    throw new Error(error)
  }
}

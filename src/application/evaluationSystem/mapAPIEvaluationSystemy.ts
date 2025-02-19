/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildAPIEvaluationSystem and buildAPIEvaluationSystemWithGradeConversions functions.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping EvaluationSystem to APIEvaluationSystem correctly,
 * handling empty input arrays, and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildAPIEvaluationSystem and buildAPIEvaluationSystemWithGradeConversions functions.
 * @author Saul Sosa
 */

import {
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import {
  EvaluationSystem,
  EvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/evaluationSystem'

/**
 * Builds an API evaluation system object from the given evaluation system.
 *
 * @param EvaluationSistem - The evaluation system to convert.
 * @returns A promise that resolves to the API evaluation system object.
 * @throws Will throw an error if the conversion fails.
 */
export const buildAPIEvaluationSystem = async (
  EvaluationSistem: EvaluationSystem,
): Promise<APIEvaluationSystem> => {
  try {
    const apiEvaluationSystem: APIEvaluationSystem = {
      evaluationsystemid: EvaluationSistem.evaluationSystemID,
      universityid: EvaluationSistem.universityID,
      universityname: EvaluationSistem.universityName,
      evaluationtype: EvaluationSistem.evaluationType,
      validgrades: EvaluationSistem.validGrades,
      evaluationsystemname: EvaluationSistem.evaluationSystemName,
      evaluationsysteminfo: EvaluationSistem.evaluationSystemInfo,
      urltoevidence: EvaluationSistem.URLToEvidence,
      fixed: EvaluationSistem.fixed,
    }
    return apiEvaluationSystem
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Builds an API evaluation system object with grade conversions.
 *
 * @param EvaluationSystemWithGradeConversions - The evaluation system with grade conversions to be converted.
 * @returns A promise that resolves to an API evaluation system with grade conversions.
 * @throws Will throw an error if the conversion process fails.
 */
export const buildAPIEvaluationSystemWithGradeConversions = async (
  EvaluationSystemWithGradeConversions: EvaluationSystemWithGradeConversions,
): Promise<APIEvaluationSystemWithGradeConversions> => {
  try {
    let gradeConversions = []
    gradeConversions = EvaluationSystemWithGradeConversions.gradeConversions.map((gc) => ({
      gradeconversionid: gc.gradeConversionID,
      evaluationsystemid: gc.evaluationSystemID,
      minintervalgrade: gc.MinIntervalGrade,
      maxintervalgrade: gc.MaxIntervalGrade,
      gradevalue: gc.gradeValue,
      gradename: gc.gradeName,
      europeanequivalence: gc.europeanEquivalence,
    }))
    const apiEvaluationSystemWithGradeConversion: APIEvaluationSystemWithGradeConversions = {
      evaluationsystemid: EvaluationSystemWithGradeConversions.evaluationSystemID,
      universityid: EvaluationSystemWithGradeConversions.universityID,
      urltoevidence: EvaluationSystemWithGradeConversions.URLToEvidence,
      evaluationsysteminfo: EvaluationSystemWithGradeConversions.evaluationSystemInfo,
      universityname: EvaluationSystemWithGradeConversions.universityName,
      evaluationtype: EvaluationSystemWithGradeConversions.evaluationType,
      validgrades: EvaluationSystemWithGradeConversions.validGrades,
      evaluationsystemname: EvaluationSystemWithGradeConversions.evaluationSystemName,
      fixed: EvaluationSystemWithGradeConversions.fixed,
      gradeconversions: gradeConversions,
    }
    return apiEvaluationSystemWithGradeConversion
  } catch (error) {
    throw new Error(error)
  }
}

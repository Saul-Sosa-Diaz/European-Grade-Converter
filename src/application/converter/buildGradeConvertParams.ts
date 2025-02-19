/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for building grade convert parameters.
 * It includes functions for building continuous and discrete grade convert parameters.
 *
 * @date February 18, 2025
 * @description This file has the implementation for building grade convert parameters.
 * @author Saul Sosa
 */
import { ContinuousGradeConvertParams, ConverterDirection } from '@/domain/converter/converter'
import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'

/**
 * Builds the parameters required for continuous grade conversion.
 *
 * @param {Object} params - The parameters for building the grade conversion.
 * @param {APIGradeConversion} params.gradeConversions - The grade conversion data from the API.
 * @param {string} params.grade - The grade to be converted.
 * @param {ConverterDirection} [params.direction] - The direction of the conversion (optional).
 * @returns {ContinuousGradeConvertParams} The parameters for continuous grade conversion.
 */
export function buildContinuousGradeConvert({
  gradeConversions,
  grade,
  direction,
}: {
  gradeConversions: APIGradeConversion
  grade: string
  direction?: ConverterDirection
}): ContinuousGradeConvertParams {
  return {
    conversion: {
      minintervalgrade: gradeConversions.minintervalgrade as number,
      baseequivalentspanishgrade: gradeConversions.baseequivalentspanishgrade,
      topequivalentspanishgrade: gradeConversions.topequivalentspanishgrade,
      maxintervalgrade: gradeConversions.maxintervalgrade as number,
    },
    grade,
    direction,
  }
}

/**
 * Builds the parameters required for discrete grade conversion.
 *
 * @param {Object} params - The parameters for the grade conversion.
 * @param {APIGradeConversion} params.gradeConversions - The grade conversion details.
 * @param {boolean} [params.specialGrade] - Indicates if the grade is special.
 * @param {ConverterDirection} [params.direction] - The direction of the conversion.
 * @returns {Object} The constructed grade conversion parameters.
 * @returns {Object} return.conversion - The conversion details.
 * @returns {number} return.conversion.baseequivalentspanishgrade - The base equivalent Spanish grade.
 * @returns {number} return.conversion.topequivalentspanishgrade - The top equivalent Spanish grade.
 * @returns {number} return.conversion.gradevalue - The grade value.
 * @returns {boolean} [return.specialGrade] - Indicates if the grade is special.
 * @returns {ConverterDirection} [return.direction] - The direction of the conversion.
 */
export function buildDiscreteGradeConvert({
  gradeConversions,
  specialGrade,
  direction,
}: {
  gradeConversions: APIGradeConversion
  specialGrade?: boolean
  direction?: ConverterDirection
}) {
  return {
    conversion: {
      baseequivalentspanishgrade: gradeConversions.baseequivalentspanishgrade,
      topequivalentspanishgrade: gradeConversions.topequivalentspanishgrade,
      gradevalue: gradeConversions.gradevalue,
    },
    specialGrade,
    direction,
  }
}

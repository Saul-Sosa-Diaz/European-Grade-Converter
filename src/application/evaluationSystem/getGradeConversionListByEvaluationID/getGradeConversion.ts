/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the getGradeConversionListByEvaluationID function.
 * It uses the EvaluationSystemRepository to retrieve the list of grade conversions by evaluation system ID.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the getGradeConversionListByEvaluationID function.
 * @author Saul Sosa
 */
import {
  EvaluationSystemRepository,
  GetGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getGradeConversionListByEvaluationID(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetGradeConversionListByEvaluationID.Request {
  return async (params) => {
    return await evaluationSystemRepository.getGradeConversionListByEvaluationID(params)
  }
}

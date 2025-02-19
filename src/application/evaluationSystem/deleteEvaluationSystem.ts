/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the deleteEvaluationSystem function.
 * It uses the EvaluationSystemRepository to delete an evaluation system.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the deleteEvaluationSystem function.
 * @author Saul Sosa
 */

import {
  DeleteEvaluationSystem,
  EvaluationSystemRepository,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function deleteEvaluationSystem(
  evaluationSystemRepository: EvaluationSystemRepository,
): DeleteEvaluationSystem.Request {
  return async (params: DeleteEvaluationSystem.Params) => {
    await evaluationSystemRepository.deleteEvaluationSystem(params)
  }
}

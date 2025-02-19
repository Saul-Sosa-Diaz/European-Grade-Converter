/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the updateEvaluationSystem function.
 * It uses the EvaluationSystemRepository to update an evaluation system.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the updateEvaluationSystem function.
 * @author Saul Sosa
 */

import {
  EvaluationSystemRepository,
  UpdateEvaluationSystem,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function updateEvaluationSystem(
  evaluationSystemRepository: EvaluationSystemRepository,
): UpdateEvaluationSystem.Request {
  return async (params: UpdateEvaluationSystem.Params) => {
    await evaluationSystemRepository.updateEvaluationSystem(params)
  }
}

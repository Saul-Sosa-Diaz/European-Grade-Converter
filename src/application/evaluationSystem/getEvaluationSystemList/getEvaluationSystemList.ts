/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the getEvaluationSystemList function.
 * It uses the EvaluationSystemRepository to retrieve the list of evaluation systems.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the getEvaluationSystemList function.
 * @author Saul Sosa
 */
import {
  EvaluationSystemRepository,
  GetEvaluationSystemList,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getEvaluationSystemList(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetEvaluationSystemList.Request {
  return async () => await evaluationSystemRepository.getEvaluationSystemList()
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the createEvaluationSystem function.
 * It uses the EvaluationSystemRepository to create a new evaluation system.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the createEvaluationSystem function.
 * @author Saul Sosa
 */
import {
  CreateEvaluationSystem,
  EvaluationSystemRepository,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function createEvaluationSystem(
  evaluationSystemrepository: EvaluationSystemRepository,
): CreateEvaluationSystem.Request {
  return async (params: CreateEvaluationSystem.Params) => {
    await evaluationSystemrepository.createEvaluationSystem(params)
  }
}

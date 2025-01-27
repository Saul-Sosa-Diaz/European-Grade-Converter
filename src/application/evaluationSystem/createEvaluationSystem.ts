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

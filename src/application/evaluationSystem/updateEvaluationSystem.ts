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

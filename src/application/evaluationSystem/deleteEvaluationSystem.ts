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

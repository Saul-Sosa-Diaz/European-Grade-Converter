import {
  EvaluationSystemRepository,
  GetEvaluationSystemList,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getEvaluationSystemList(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetEvaluationSystemList.Request {
  return async () => await evaluationSystemRepository.getEvaluationSystemList()
}

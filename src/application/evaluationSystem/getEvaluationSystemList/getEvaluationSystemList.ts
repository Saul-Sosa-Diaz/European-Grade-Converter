import {
  EvalutationSystemRepository,
  GetEvaluationSystemList,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getEvaluationSystemList(
  evaluationSystemRepository: EvalutationSystemRepository,
): GetEvaluationSystemList.Request {
  return async () => await evaluationSystemRepository.getEvaluationSystemList()
}

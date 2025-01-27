import {
  EvalutationSystemRepository,
  GetEvaluationSystemList,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getEvaluationSystemList(
  countryRepository: EvalutationSystemRepository,
): GetEvaluationSystemList.Request {
  return async () => await countryRepository.getEvaluationSystemList()
}

import {
  EvaluationSystemRepository,
  GetContinouosGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getContinouosGradeConversionListByEvaluationID(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetContinouosGradeConversionListByEvaluationID.Request {
  return async (params) =>
    await evaluationSystemRepository.getContinouosGradeConversionListByEvaluationID(params)
}

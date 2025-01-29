import {
  EvaluationSystemRepository,
  GetContinuousGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getContinouosGradeConversionListByEvaluationID(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetContinuousGradeConversionListByEvaluationID.Request {
  return async (params) => {
    return await evaluationSystemRepository.getContinouosGradeConversionListByEvaluationID(params)
  }
}

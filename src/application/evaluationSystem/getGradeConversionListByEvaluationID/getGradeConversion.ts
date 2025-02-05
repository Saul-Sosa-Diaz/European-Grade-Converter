import {
  EvaluationSystemRepository,
  GetGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function getGradeConversionListByEvaluationID(
  evaluationSystemRepository: EvaluationSystemRepository,
): GetGradeConversionListByEvaluationID.Request {
  return async (params) => {
    return await evaluationSystemRepository.getGradeConversionListByEvaluationID(params)
  }
}

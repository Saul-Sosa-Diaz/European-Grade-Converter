import {
  ConvertGrade,
  EvaluationSystemRepository,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function convertGrade(gradesRepository: EvaluationSystemRepository): ConvertGrade.Request {
  return async (params: ConvertGrade.Params) => await gradesRepository.convertGrade(params)
}

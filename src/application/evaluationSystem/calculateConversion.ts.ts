import {
  ConvertGrade,
  EvalutationSystemRepository,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function convertGrade(gradesRepository: EvalutationSystemRepository): ConvertGrade.Request {
  return async (params: ConvertGrade.Params) => await gradesRepository.convertGrade(params)
}

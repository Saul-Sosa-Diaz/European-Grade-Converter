import { ConvertGrade, GradesRepository } from '@/domain/grades/gradesRepository'

export function convertGrade(gradesRepository: GradesRepository): ConvertGrade.Request {
  return async (params: ConvertGrade.Params) => await gradesRepository.convertGrade(params)
}

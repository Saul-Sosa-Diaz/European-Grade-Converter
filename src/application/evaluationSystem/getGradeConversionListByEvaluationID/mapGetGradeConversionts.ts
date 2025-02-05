import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EuropeanEquivalence, GradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

export const buildGradeConversionListByEvaluationIDMap = async (
  dto: APIGradeConversion[],
): Promise<GradeConversion[]> => {
  try {
    const gradeConversionList: GradeConversion[] = dto.map(
      (gardeConversion: APIGradeConversion) => {
        return {
          gradeConversionID: gardeConversion.gradeconversionid,
          evaluationSystemID: gardeConversion.evaluationsystemid,
          MinIntervalGrade: gardeConversion.minintervalgrade,
          MaxIntervalGrade: gardeConversion.maxintervalgrade,
          gradeName: gardeConversion.gradename,
          gradeValue: gardeConversion.gradevalue,
          europeanEquivalence: gardeConversion.europeanequivalence as EuropeanEquivalence,
        }
      },
    )
    console.log(gradeConversionList)
    return gradeConversionList
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

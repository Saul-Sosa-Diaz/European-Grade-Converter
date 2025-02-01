import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { GradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

export const buildGradeConversionListByEvaluationIDMap = async (
  dto: APIGradeConversion[],
): Promise<GradeConversion[]> => {
  try {
    const gardeConversionList: GradeConversion[] = dto.map(
      (gardeConversion: APIGradeConversion) => {
        return {
          gradeConversionID: gardeConversion.gradeconversionid,
          evaluationSystemID: gardeConversion.evaluationsystemid,
          MinIntervalGrade: gardeConversion.minintervalgrade,
          MaxIntervalGrade: gardeConversion.maxintervalgrade,
          gradeName: gardeConversion.gradename,
          gradeValue: gardeConversion.gradevalue
        }
      },
    )
    console.log(gardeConversionList)
    return gardeConversionList
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

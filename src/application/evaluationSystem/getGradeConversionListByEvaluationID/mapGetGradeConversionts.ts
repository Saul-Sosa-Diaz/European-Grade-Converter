import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { GradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

export const buildGradeConversionListByEvaluationIDMap = async (
  dto: APIGradeConversion[],
): Promise<GradeConversion[]> => {
  try {
    const continuousGradeConversionList: GradeConversion[] = dto.map(
      (continuousGradeConversion: APIGradeConversion) => {
        return {
          gradeConversionID: continuousGradeConversion.gradeconversionid,
          evaluationSystemID: continuousGradeConversion.evaluationsystemid,
          MinIntervalGrade: continuousGradeConversion.minintervalgrade,
          MaxIntervalGrade: continuousGradeConversion.maxintervalgrade,
          gradeName: continuousGradeConversion.gradename,
        }
      },
    )
    return continuousGradeConversionList
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

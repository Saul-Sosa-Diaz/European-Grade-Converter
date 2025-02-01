import { APIContinuousGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { GradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

export const buildContinuousGradeConversionListByEvaluationIDMap = async (
  dto: APIContinuousGradeConversion[],
): Promise<GradeConversion[]> => {
  try {
    const continuousGradeConversionList: GradeConversion[] = dto.map(
      (continuousGradeConversion: APIContinuousGradeConversion) => {
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

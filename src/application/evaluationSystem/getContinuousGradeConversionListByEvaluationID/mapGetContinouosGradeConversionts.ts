import { APIContinuousGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { ContinuousGradeConversion } from '@/domain/evaluationSystem/evaluationSystem'

export const buildContinuousGradeConversionListByEvaluationIDMap = async (
  dto: APIContinuousGradeConversion[],
): Promise<ContinuousGradeConversion[]> => {
  try {
    const continuousGradeConversionList: ContinuousGradeConversion[] = dto.map(
      (continuousGradeConversion: APIContinuousGradeConversion) => {
        return {
          gradeConversionID: continuousGradeConversion.gradeconversionid,
          evaluationSystemID: continuousGradeConversion.evaluationsystemid,
          MinIntervalGrade: continuousGradeConversion.minintervalgrade,
          MaxIntervalGrade: continuousGradeConversion.maxintervalgrade,
          baseEquivalentSpanishGrade: continuousGradeConversion.baseequivalentspanishgrade,
          topEquivalentSpanishGrade: continuousGradeConversion.topequivalentspanishgrade,
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

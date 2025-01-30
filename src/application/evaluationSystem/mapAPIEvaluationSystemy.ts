import {
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem'

export const buildAPIEvaluationSystemWithGradeConversions = async (
  EvaluationSystemWithGradeConversions: EvaluationSystemWithGradeConversions,
): Promise<APIEvaluationSystem> => {
  try {
    const apiEvaluationSystemWithGradeConversion: APIEvaluationSystemWithGradeConversions = {
      evaluationsystemid: EvaluationSystemWithGradeConversions.evaluationSystemID,
      universityid: EvaluationSystemWithGradeConversions.universityID,
      universityname: EvaluationSystemWithGradeConversions.universityName,
      evaluationtype: EvaluationSystemWithGradeConversions.evaluationType,
      validgrades: EvaluationSystemWithGradeConversions.validGrades,
      evaluationsystemname: EvaluationSystemWithGradeConversions.evaluationSystemName,
      fixed: EvaluationSystemWithGradeConversions.fixed,
      gradeconversions: EvaluationSystemWithGradeConversions.gradeConversions.map((gc) => ({
        gradeconversionid: gc.gradeConversionID,
        evaluationsystemid: gc.evaluationSystemID,
        minintervalgrade: gc.MinIntervalGrade,
        maxintervalgrade: gc.MaxIntervalGrade,
        gradename: gc.gradeName,
      })),
    }
    return apiEvaluationSystemWithGradeConversion
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

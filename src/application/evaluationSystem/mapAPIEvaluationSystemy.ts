import {
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import {
  EvaluationSystem,
  EvaluationSystemWithGradeConversions,
  EvaluationType,
} from '@/domain/evaluationSystem/evaluationSystem'

export const buildAPIEvaluationSystem = async (
  EvaluationSistem: EvaluationSystem,
): Promise<APIEvaluationSystem> => {
  try {
    const apiEvaluationSystem: APIEvaluationSystem = {
      evaluationsystemid: EvaluationSistem.evaluationSystemID,
      universityid: EvaluationSistem.universityID,
      universityname: EvaluationSistem.universityName,
      evaluationtype: EvaluationSistem.evaluationType,
      validgrades: EvaluationSistem.validGrades,
      evaluationsystemname: EvaluationSistem.evaluationSystemName,
      fixed: EvaluationSistem.fixed,
    }
    return apiEvaluationSystem
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const buildAPIEvaluationSystemWithGradeConversions = async (
  EvaluationSystemWithGradeConversions: EvaluationSystemWithGradeConversions,
): Promise<APIEvaluationSystem> => {
  try {
    let gradeConversions = []
    if (EvaluationSystemWithGradeConversions.evaluationType === EvaluationType.CONTINUOUS) {
      gradeConversions = EvaluationSystemWithGradeConversions.gradeConversions.map((gc) => ({
        gradeconversionid: gc.gradeConversionID,
        evaluationsystemid: gc.evaluationSystemID,
        minintervalgrade: gc.MinIntervalGrade,
        maxintervalgrade: gc.MaxIntervalGrade,
        gradename: gc.gradeName,
      }))
    } else {
      gradeConversions = EvaluationSystemWithGradeConversions.gradeConversions.map((gc) => ({
        gradeconversionid: gc.gradeConversionID,
        evaluationsystemid: gc.evaluationSystemID,
        gradename: gc.gradeName,
        gradevalue: gc.gradeValue,
      }))
    }
    const apiEvaluationSystemWithGradeConversion: APIEvaluationSystemWithGradeConversions = {
      evaluationsystemid: EvaluationSystemWithGradeConversions.evaluationSystemID,
      universityid: EvaluationSystemWithGradeConversions.universityID,
      universityname: EvaluationSystemWithGradeConversions.universityName,
      evaluationtype: EvaluationSystemWithGradeConversions.evaluationType,
      validgrades: EvaluationSystemWithGradeConversions.validGrades,
      evaluationsystemname: EvaluationSystemWithGradeConversions.evaluationSystemName,
      fixed: EvaluationSystemWithGradeConversions.fixed,
      gradeconversions: gradeConversions,
    }
    return apiEvaluationSystemWithGradeConversion
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

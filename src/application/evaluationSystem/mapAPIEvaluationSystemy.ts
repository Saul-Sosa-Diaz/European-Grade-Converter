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
): Promise<APIEvaluationSystemWithGradeConversions> => {
  try {
    let gradeConversions = []
    gradeConversions = EvaluationSystemWithGradeConversions.gradeConversions.map((gc) => ({
      gradeconversionid: gc.gradeConversionID,
      evaluationsystemid: gc.evaluationSystemID,
      minintervalgrade: gc.MinIntervalGrade,
      maxintervalgrade: gc.MaxIntervalGrade,
      gradevalue: gc.gradeValue,
      gradename: gc.gradeName,
      europeanequivalence: gc.europeanEquivalence,
    }))
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
    console.log(apiEvaluationSystemWithGradeConversion)
    return apiEvaluationSystemWithGradeConversion
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

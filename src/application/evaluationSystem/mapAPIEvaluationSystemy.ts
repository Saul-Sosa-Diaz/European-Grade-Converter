import { APIEvaluationSystem } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'

export const buildAPIEvaluationSystem = async (country: EvaluationSystem): Promise<APIEvaluationSystem> => {
  try {
    const apiEvaluationSystem: APIEvaluationSystem = {
      evaluationsystemid: country.evaluationSystemID,
      universityid: country.universityID,
      universityname: country.universityName,
      evaluationtype: country.evaluationType,
      validgrades: country.validGrades,
      evaluationsystemname: country.evaluationSystemName,
      fixed: country.fixed,
    }
    return apiEvaluationSystem
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

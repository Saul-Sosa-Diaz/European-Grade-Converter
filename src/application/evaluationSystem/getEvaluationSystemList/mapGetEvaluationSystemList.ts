import { APIEvaluationSystem } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'

export const builEvaluationSystemListMap = async (
  dto: APIEvaluationSystem[],
): Promise<EvaluationSystem[]> => {
  try {
    const mappedEvaluationSystems = dto.map((evaluationSystem) => {
      return {
        evaluationSystemID: evaluationSystem.evaluationsystemid,
        universityID: evaluationSystem.universityid,
        universityName: evaluationSystem.universityname,
        evaluationType: evaluationSystem.evaluationtype,
        validGrades: evaluationSystem.validgrades,
        evaluationSystemName: evaluationSystem.evaluationsystemname,
        fixed: evaluationSystem.fixed,
      }
    })
    return mappedEvaluationSystems
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

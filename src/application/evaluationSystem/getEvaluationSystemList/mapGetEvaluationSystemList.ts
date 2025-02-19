/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the buildEvaluationSystemListMap function.
 * It maps APIEvaluationSystem objects to EvaluationSystem objects.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the buildEvaluationSystemListMap function.
 * @author Saul Sosa
 */
import { APIEvaluationSystem } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'

/**
 * Builds a list of evaluation systems by mapping the provided DTOs to the required format.
 *
 * @param dto - An array of APIEvaluationSystem objects to be mapped.
 * @returns A promise that resolves to an array of EvaluationSystem objects.
 * @throws Will throw an error if the mapping process fails.
 */
export const buildEvaluationSystemListMap = async (
  dto: APIEvaluationSystem[],
): Promise<EvaluationSystem[]> => {
  try {
    const mappedEvaluationSystems = dto.map((evaluationSystem) => {
      return {
        evaluationSystemID: evaluationSystem.evaluationsystemid,
        universityID: evaluationSystem.universityid,
        universityName: evaluationSystem.universityname,
        evaluationType: evaluationSystem.evaluationtype,
        evaluationSystemInfo: evaluationSystem.evaluationsysteminfo,
        URLToEvidence: evaluationSystem.urltoevidence,
        validGrades: evaluationSystem.validgrades,
        evaluationSystemName: evaluationSystem.evaluationsystemname,
        fixed: evaluationSystem.fixed,
      }
    })
    return mappedEvaluationSystems
  } catch (error) {
    throw new Error(error)
  }
}

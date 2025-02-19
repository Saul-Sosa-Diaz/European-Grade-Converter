/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to update an evaluation system using a mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for updating an evaluation system.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to update an evaluation system using a mutation.
 *
 * @returns {Object} An object containing the `updateEvaluationSystem` function and other mutation properties.
 *
 * @example
 * const { updateEvaluationSystem } = useUpdateEvaluationSystem();
 *
 * const handleUpdate = async (evaluationSystem) => {
 *   try {
 *     await updateEvaluationSystem(evaluationSystem);
 *     // Handle success
 *   } catch (error) {
 *     // Handle error
 *   }
 * };
 */
export const useUpdateEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystemWithGradeConversions) => {
      const response = await EvaluationSystem.updateEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

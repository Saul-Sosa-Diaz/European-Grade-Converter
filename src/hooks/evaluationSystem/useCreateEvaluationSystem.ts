/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to create an evaluation system using a mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for creating an evaluation system.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { EvaluationSystemWithGradeConversions } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to create an evaluation system using a mutation.
 *
 * @returns {Object} An object containing the `createEvaluationSystem` function and other mutation properties.
 *
 * @example
 * const { createEvaluationSystem } = useCreateEvaluationSystem();
 *
 * const handleCreate = async () => {
 *   try {
 *     const response = await createEvaluationSystem(evaluationSystemData);
 *     console.log('Evaluation system created:', response);
 *   } catch (error) {
 *     console.error('Error creating evaluation system:', error);
 *   }
 * };
 */
export const useCreateEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystemWithGradeConversions) => {
      const response = await EvaluationSystem.createEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

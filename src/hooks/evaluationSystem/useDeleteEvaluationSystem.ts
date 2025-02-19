/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to delete an evaluation system using a mutation.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the custom hook for deleting an evaluation system.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { EvaluationSystem } from '@/domain/evaluationSystem/evaluationSystem'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to delete an evaluation system.
 *
 * This hook provides a mutation function to delete an evaluation system using the API.
 *
 * @returns {Object} An object containing the `deleteEvaluationSystem` function and other mutation properties.
 * @property {Function} deleteEvaluationSystem - The function to delete an evaluation system asynchronously.
 * @property {Object} mutation - The mutation object containing properties like `isLoading`, `isError`, etc.
 */
export const useDeleteEvaluationSystem = () => {
  const { EvaluationSystem } = useApi()

  const mutation = useMutation({
    mutationFn: async (evaluationSystem: EvaluationSystem) => {
      const response = await EvaluationSystem.deleteEvaluationSystem(evaluationSystem)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteEvaluationSystem: mutation.mutateAsync,
    ...mutation,
  }
}

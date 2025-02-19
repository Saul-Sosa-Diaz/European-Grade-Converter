/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to fetch the list of evaluation systems.
 * This hook uses the `useApi` hook to get the `EvaluationSystem` API instance
 * and the `useQuery` hook to fetch the evaluation system list.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for fetching the list of evaluation systems.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch the list of evaluation systems.
 *
 * This hook uses the `useApi` hook to get the `EvaluationSystem` API instance
 * and the `useQuery` hook to fetch the evaluation system list.
 *
 * @returns {Object} An object containing the evaluation system list data and other properties from the `useQuery` hook.
 * @returns {Array} return.evaluationSystemList - The list of evaluation systems.
 * @returns {Object} return.rest - Other properties returned by the `useQuery` hook.
 */
export const useGetEvaluationSystemList = () => {
  const { EvaluationSystem } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['evaluationSystemList'],
    queryFn: async () => await EvaluationSystem.getEvaluationSystemList(),
  })

  return { evaluationSystemList: data, ...rest }
}

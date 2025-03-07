/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to fetch the list of continuous grade conversions by evaluation system ID.
 * This hook uses the `useApi` hook to get the `EvaluationSystem` API object and the `useQuery` hook
 * from `react-query` to fetch the grade conversion list.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for fetching the list of continuous grade conversions by evaluation system ID.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { GetGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch the grade conversion list by evaluation ID.
 *
 * @param {GetGradeConversionListByEvaluationID.Params} params - The parameters required to fetch the grade conversion list.
 * @returns {Object} An object containing the grade conversion list and other query properties.
 *
 * @example
 * const { getGradeConversionListByEvaluationID, isLoading, error } = useGetGradeConversionListByEvaluationID({ evaluationSystemID: '123' });
 *
 * @remarks
 * The query is enabled only if `params.evaluationSystemID` is truthy.
 */
export const useGetGradeConversionListByEvaluationID = (
  params: GetGradeConversionListByEvaluationID.Params,
) => {
  const { EvaluationSystem } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['getGradeConversionListByEvaluationID', JSON.stringify(params)],
    queryFn: async () => await EvaluationSystem.getGradeConversionListByEvaluationID(params),
    enabled: !!params.evaluationSystemID,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
  return { getGradeConversionListByEvaluationID: data, ...rest }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to fetch the list of countries with evaluation information.
 * This hook uses the `useApi` hook to get the `Country` API object and the `useQuery` hook
 * from `react-query` to fetch the country list with evaluation information.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for fetching the country list with evaluation information.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch the list of countries with their evaluation information.
 *
 * This hook uses the `useApi` hook to get the `Country` API object and the `useQuery` hook
 * from React Query to fetch the data. The query key used is `['countryWithEvaluationInfoList']`.
 *
 * @returns {Object} An object containing the list of countries with evaluation information (`countryWithEvaluationInfoList`)
 *                   and other properties from the `useQuery` hook.
 */
export const useGetCountryWithEvaluationInfoList = () => {
  const { Country } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['countryWithEvaluationInfoList'],
    queryFn: async () => await Country.getCountryWithEvaluationInfoList(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return { countryWithEvaluationInfoList: data, ...rest }
}

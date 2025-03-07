/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to fetch the list of universities.
 * This hook uses the `useApi` hook to get the `University` API object and the `useQuery` hook
 * from `react-query` to fetch the university list.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for fetching the list of universities.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch the list of universities.
 *
 * This hook uses the `useApi` hook to get the `University` API object and
 * the `useQuery` hook from React Query to fetch the university list.
 *
 * @returns {Object} An object containing the university list data and other properties from the `useQuery` hook.
 * @property {Array} universityList - The list of universities fetched from the API.
 * @property {Object} rest - Other properties returned by the `useQuery` hook.
 */
export const useGetUniversityList = () => {
  const { University } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['universityList'],
    queryFn: async () => await University.getUniversityList(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return { universityList: data, ...rest }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to fetch the list of countries.
 * This hook uses the `useApi` hook to get the `Country` API object and the `useQuery` hook
 * from `react-query` to fetch the country list.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for fetching the country list.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch the list of countries.
 *
 * This hook uses the `useApi` hook to get the `Country` API object and the `useQuery` hook
 * from `react-query` to fetch the country list.
 *
 * @returns {Object} An object containing the country list data and other properties from the `useQuery` hook.
 * @returns {Array} return.countryList - The list of countries fetched from the API.
 * @returns {Object} return.rest - Other properties returned by the `useQuery` hook.
 */
export const useGetCountryList = () => {
  const { Country } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['countryList'],
    queryFn: async () => await Country.getCountryList(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return { countryList: data, ...rest }
}

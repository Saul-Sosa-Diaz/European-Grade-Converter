/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to create a new country using the API.
 * This hook utilizes a mutation to handle the creation of a country.
 * It provides the `createCountry` function which can be used to trigger the mutation.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the custom hook for creating a country.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to create a new country using the API.
 *
 * This hook utilizes a mutation to handle the creation of a country.
 * It provides the `createCountry` function which can be used to trigger the mutation.
 *
 * @returns {Object} An object containing the `createCountry` function and other mutation properties.
 *
 * @example
 * const { createCountry } = useCreateCountry();
 *
 * const handleCreateCountry = async (newCountry) => {
 *   try {
 *     const response = await createCountry(newCountry);
 *     console.log('Country created successfully:', response);
 *   } catch (error) {
 *     console.error('Error creating country:', error);
 *   }
 * };
 */
export const useCreateCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.createCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createCountry: mutation.mutateAsync,
    ...mutation,
  }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to update a country using the API.
 * This hook utilizes a mutation to handle the updating of a country.
 * It provides the `updateCountry` function which can be used to trigger the mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for updating a country.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to update a country using a mutation.
 *
 * @returns {object} An object containing the `updateCountry` function and other mutation properties.
 *
 * @example
 * const { updateCountry } = useUpdateCountry();
 *
 * const handleUpdate = async (country) => {
 *   try {
 *     await updateCountry(country);
 *     console.log('Country updated successfully');
 *   } catch (error) {
 *     console.error('Failed to update country', error);
 *   }
 * };
 */
export const useUpdateCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.updateCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateCountry: mutation.mutateAsync,
    ...mutation,
  }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to delete a country using the API.
 * This hook utilizes a mutation to handle the deletion of a country.
 * It provides the `deleteCountry` function which can be used to trigger the mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for deleting a country.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to delete a country using a mutation.
 *
 * @returns {Object} An object containing the deleteCountry function and other mutation properties.
 * @property {Function} deleteCountry - Function to delete a country asynchronously.
 * @property {...Object} mutation - Other properties from the mutation object.
 *
 * @example
 * const { deleteCountry } = useDeleteCountry();
 *
 * deleteCountry(country)
 *   .then(response => {
 *     // handle success
 *   })
 *   .catch(error => {
 *     // handle error
 *   });
 */
export const useDeleteCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.deleteCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteCountry: mutation.mutateAsync,
    ...mutation,
  }
}

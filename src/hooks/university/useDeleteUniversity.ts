/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to delete a university using the API.
 * This hook utilizes a mutation to handle the deletion of a university.
 * It provides the `deleteUniversity` function which can be used to trigger the mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for deleting a university.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to delete a university using a mutation.
 *
 * @returns {Object} An object containing the deleteUniversity function and other mutation properties.
 * @property {Function} deleteUniversity - Function to delete a university asynchronously.
 * @property {Object} mutation - The mutation object containing properties like status, error, etc.
 *
 * @example
 * const { deleteUniversity } = useDeleteUniversity();
 *
 * deleteUniversity(university)
 *   .then(response => {
 *     console.log('University deleted successfully:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error deleting university:', error);
 *   });
 */
export const useDeleteUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.deleteUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

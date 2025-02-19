/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to update a university using the API.
 * This hook utilizes a mutation to handle the updating of a university.
 * It provides the `updateUniversity` function which can be used to trigger the mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for updating a university.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to update a university using a mutation.
 *
 * This hook provides a function to update a university and handles the mutation state.
 *
 * @returns {Object} An object containing the `updateUniversity` function and the mutation state.
 * @property {Function} updateUniversity - Function to update a university asynchronously.
 * @property {Object} mutation - The mutation state object.
 */
export const useUpdateUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.updateUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

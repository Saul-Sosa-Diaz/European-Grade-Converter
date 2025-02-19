/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to create a university using the API.
 * This hook utilizes a mutation to handle the creation of a university.
 * It provides the `createUniversity` function which can be used to trigger the mutation.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for creating a university.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

/**
 * Custom hook to create a university using a mutation.
 *
 * @returns {Object} An object containing the `createUniversity` function and other mutation properties.
 *
 * @property {Function} createUniversity - Function to create a university asynchronously.
 * @property {Object} mutation - The mutation object containing properties and methods for the mutation.
 *
 * @example
 * const { createUniversity } = useCreateUniversity();
 *
 * createUniversity({
 *   name: 'Example University',
 *   location: 'Example Location',
 *   // other university properties
 * }).then(response => {
 *   console.log('University created:', response);
 * }).catch(error => {
 *   console.error('Error creating university:', error);
 * });
 */
export const useCreateUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.createUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

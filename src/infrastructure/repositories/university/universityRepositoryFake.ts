/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of a fake UniversityRepository.
 * It provides a mock implementation for managing universities.
 *
 * @date February 19, 2025
 * @description This file implements a fake UniversityRepository for testing purposes.
 * @author Saul Sosa
 */

import { UniversityRepository } from '@/domain/university/universityRepository'

export function createUniversityRepositoryFake(): UniversityRepository {
  return {
    getUniversityList: async () => {
      return [{ name: 'University of Toronto', country: 'Canada', countryID: '1', id: '2' }]
    },
    updateUniversity: async (country) => {
      // Use the country parameter
      console.log(country)
      return
    },
    createUniversity: async (country) => {
      console.log(country)
      return
    },
    deleteUniversity: async (country) => {
      console.log(country)
      return
    },
  }
}

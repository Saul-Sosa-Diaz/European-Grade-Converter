/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of a fake ConverterRepository.
 * It provides a mock implementation for converting grades.
 *
 * @date February 19, 2025
 * @description This file implements a fake ConverterRepository for testing purposes.
 * @author Saul Sosa
 */

import { ConverterRepository } from '@/domain/converter/converterRepository'

export function createConverterRepositoryFake(): ConverterRepository {
  return {
    convertGrade: async (params) => {
      const grade = Number(params.grade)
      if (grade < 5) return 'F'
      if (grade < 6) return 'E'
      if (grade < 7) return 'D'
      if (grade < 8) return 'C'
      return 'A'
    },
  }
}

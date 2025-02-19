/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of a fake EvaluationSystemRepository.
 * It provides a mock implementation for managing evaluation systems.
 *
 * @date February 19, 2025
 * @description This file implements a fake EvaluationSystemRepository for testing purposes.
 * @author Saul Sosa
 */

import { EvaluationSystemRepository } from '@/domain/evaluationSystem/evaluationSystemRepository'
import {
  EVALUATION_SYSTEM_LIST,
  SPAIN_GRADE_CONVERSIONS,
} from '@/infrastructure/fixture/evaluationSystem'

export function createEvaluationSystemRepositoryFake(): EvaluationSystemRepository {
  return {
    getEvaluationSystemList: async () => {
      return EVALUATION_SYSTEM_LIST
    },
    getGradeConversionListByEvaluationID: async (params) => {
      return SPAIN_GRADE_CONVERSIONS
      console.log('getGradeConversionListByEvaluationID', params)
    },
    updateEvaluationSystem: async (params) => {
      console.log('updateEvaluationSystem', params)
    },
    createEvaluationSystem: async (params) => {
      console.log('createEvaluationSystem', params)
    },
    deleteEvaluationSystem: async (params) => {
      console.log('deleteEvaluationSystem', params)
    },
  }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the EvaluationSystemRepository.
 * It defines functions to manage evaluation systems using an external API.
 *
 * @date February 19, 2025
 * @description This file implements the EvaluationSystemRepository for managing evaluation systems.
 * @author Saul Sosa
 */

import { buildGradeConversionListByEvaluationIDMap } from '@/application/evaluationSystem/getGradeConversionListByEvaluationID/mapGetGradeConversionts'
import { buildEvaluationSystemListMap } from '@/application/evaluationSystem/getEvaluationSystemList/mapGetEvaluationSystemList'
import {
  buildAPIEvaluationSystem,
  buildAPIEvaluationSystemWithGradeConversions,
} from '@/application/evaluationSystem/mapAPIEvaluationSystemy'
import { API_URL } from '@/constants/apiURL'
import {
  APIGradeConversion,
  APIEvaluationSystem,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import {
  EvaluationSystemRepository,
  GetGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function createEvaluationSystemRepository(): EvaluationSystemRepository {
  return {
    getEvaluationSystemList: async () => {
      const evaluationSystemList: { evaluationSystemList: APIEvaluationSystem[] } = await fetch(
        API_URL.evaluationSystem.getEvaluationSystemList,
      )
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })

      const mappedEvaluationSystemList = buildEvaluationSystemListMap(
        evaluationSystemList.evaluationSystemList,
      )
      return mappedEvaluationSystemList
    },
    getGradeConversionListByEvaluationID: async (
      params: GetGradeConversionListByEvaluationID.Params,
    ) => {
      const continuousGradeConversionList: {
        gradeConversionListByID: APIGradeConversion[]
      } = await fetch(API_URL.evaluationSystem.getGradeConversionListByEvaluationID, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      const continuousGradeConversion = await buildGradeConversionListByEvaluationIDMap(
        continuousGradeConversionList.gradeConversionListByID,
      )
      return continuousGradeConversion
    },
    updateEvaluationSystem: async (params) => {
      const apiParams = await buildAPIEvaluationSystemWithGradeConversions(params)

      const response = await fetch(API_URL.evaluationSystem.updateEvaluationSystem, {
        method: 'put',
        body: JSON.stringify(apiParams),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    createEvaluationSystem: async (params) => {
      const apiParams = await buildAPIEvaluationSystemWithGradeConversions(params)
      const response = await fetch(API_URL.evaluationSystem.createEvaluationSystem, {
        method: 'post',
        body: JSON.stringify(apiParams),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    deleteEvaluationSystem: async (params) => {
      const apiParams = await buildAPIEvaluationSystem(params)
      const response = await fetch(API_URL.evaluationSystem.deleteEvaluationSystem, {
        method: 'delete',
        body: JSON.stringify(apiParams),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
  }
}

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
  ConvertGrade,
  EvaluationSystemRepository,
  GetGradeConversionListByEvaluationID,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function createEvaluationSystemRepository(): EvaluationSystemRepository {
  return {
    convertGrade: async (params: ConvertGrade.Params) => {
      const { convertedGrade } = await fetch(API_URL.evaluationSystem.convertGrade, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      return convertedGrade
    },
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
        continuousGradeConversionListByEvaluationID: APIGradeConversion[]
      } = await fetch(API_URL.evaluationSystem.getGradeConversionListByEvaluationID, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      const continuousGradeConversion = await buildGradeConversionListByEvaluationIDMap(
        continuousGradeConversionList.continuousGradeConversionListByEvaluationID,
      )
      return continuousGradeConversion
    },
    updateEvaluationSystem: async (params) => {
      const response = await fetch(API_URL.evaluationSystem.updateEvaluationSystem, {
        method: 'post',
        body: JSON.stringify(await buildAPIEvaluationSystemWithGradeConversions(params)),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    createEvaluationSystem: async (params) => {
      const response = await fetch(API_URL.evaluationSystem.createEvaluationSystem, {
        method: 'post',
        body: JSON.stringify(await buildAPIEvaluationSystemWithGradeConversions(params)),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    deleteEvaluationSystem: async (params) => {
      const response = await fetch(API_URL.evaluationSystem.deleteEvaluationSystem, {
        method: 'post',
        body: JSON.stringify(await buildAPIEvaluationSystem(params)),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
  }
}

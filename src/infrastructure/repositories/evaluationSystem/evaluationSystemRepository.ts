import { buildEvaluationSystemListMap } from '@/application/evaluationSystem/getEvaluationSystemList/mapGetEvaluationSystemList'
import { API_URL } from '@/constants/apiURL'
import { APIEvaluationSystem } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import {
  ConvertGrade,
  EvaluationSystemRepository,
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
      console.log('getEvaluationSystemList')
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
    updateEvaluationSystem: async (params) => {
      await fetch(API_URL.evaluationSystem.updateEvaluationSystem, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      }).catch((error) => {
        throw new Error(error)
      })
    },
    createEvaluationSystem: async (params) => {
      await fetch(API_URL.evaluationSystem.createEvaluationSystem, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      }).catch((error) => {
        throw new Error(error)
      })
    },
    deleteEvaluationSystem: async (params) => {
      await fetch(API_URL.evaluationSystem.deleteEvaluationSystem, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      }).catch((error) => {
        throw new Error(error)
      })
    },
  }
}

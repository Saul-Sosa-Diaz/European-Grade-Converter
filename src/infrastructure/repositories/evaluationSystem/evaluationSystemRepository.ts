import { API_URL } from '@/constants/apiURL'
import {
  ConvertGrade,
  EvalutationSystemRepository,
} from '@/domain/evaluationSystem/evaluationSystemRepository'

export function createEvaluationSystemRepository(): EvalutationSystemRepository {
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
  }
}

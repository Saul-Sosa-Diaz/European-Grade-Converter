import { API_URL } from '@/constants/apiURL'
import { ConvertGrade, GradesRepository } from '@/domain/grades/gradesRepository'

export function createGradeRepository(): GradesRepository {
  return {
    convertGrade: async (params: ConvertGrade.Params) => {
      const { convertedGrade } = await fetch(API_URL.grade.convertGrade, {
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

import { ConvertGrade, GradesRepository } from '@/domain/grades/gradesRepository'

export function createGradeRepository(): GradesRepository {
  return {
    convertGrade: async (params: ConvertGrade.Params) => {
      const { convertedGrade } = await fetch('/api/convertGrade', {
        method: 'get',
        body: JSON.stringify({ ...params, direction: 'toSpain' }),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      return convertedGrade
    },
  }
}

import { useApi } from '@/context/ApiContext'
import { ConvertGrade } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { useQuery } from '@tanstack/react-query'

export const useConvertGrade = (params: ConvertGrade.Params | null) => {
  const { EvaluationSystem: Grades } = useApi()
  const isParamsValid = !!(
    params &&
    params.fromEvaluationSystemID &&
    params.toEvaluationSystemID &&
    params.grade
  )
  const { data, ...rest } = useQuery({
    queryKey: [
      'convert-grade',
      params.fromEvaluationSystemID,
      params.grade,
      params.toEvaluationSystemID,
      isParamsValid,
    ],
    queryFn: async () => {
      if (!isParamsValid) {
        return null
      }
      return await Grades.convertGrade(params)
    },
    enabled: isParamsValid,
  })

  return { convertedGrade: data, ...rest }
}

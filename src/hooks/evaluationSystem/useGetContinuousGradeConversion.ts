import { useApi } from '@/context/ApiContext'
import { GetContinouosGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { useQuery } from '@tanstack/react-query'

export const useGetContinuousGradeConversionListByEvaluationID = (
  params: GetContinouosGradeConversionListByEvaluationID.Params,
) => {
  const { EvaluationSystem } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['getContinuousGradeConversionListByEvaluationID', JSON.stringify(params)],
    queryFn: async () =>
      await EvaluationSystem.getContinouosGradeConversionListByEvaluationID(params),
  })

  return { evaluationSystemList: data, ...rest }
}

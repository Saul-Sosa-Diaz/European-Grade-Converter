import { useApi } from '@/context/ApiContext'
import { GetContinuousGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { useQuery } from '@tanstack/react-query'

export const useGetContinuousGradeConversionListByEvaluationID = (
  params: GetContinuousGradeConversionListByEvaluationID.Params,
) => {
  const { EvaluationSystem } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['getContinuousGradeConversionListByEvaluationID', JSON.stringify(params)],
    queryFn: async () =>
      await EvaluationSystem.getContinouosGradeConversionListByEvaluationID(params),
    enabled: !!params.evaluationSystemID,
  })
  return { getContinouosGradeConversionListByEvaluationID: data, ...rest }
}

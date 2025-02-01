import { useApi } from '@/context/ApiContext'
import { GetGradeConversionListByEvaluationID } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { useQuery } from '@tanstack/react-query'

export const useGetGradeConversionListByEvaluationID = (
  params: GetGradeConversionListByEvaluationID.Params,
) => {
  const { EvaluationSystem } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['getContinuousGradeConversionListByEvaluationID', JSON.stringify(params)],
    queryFn: async () => await EvaluationSystem.getGradeConversionListByEvaluationID(params),
    enabled: !!params.evaluationSystemID,
  })
  return { getContinouosGradeConversionListByEvaluationID: data, ...rest }
}

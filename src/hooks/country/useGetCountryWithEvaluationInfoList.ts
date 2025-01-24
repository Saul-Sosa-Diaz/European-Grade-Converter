import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountryWithEvaluationInfoList = () => {
  const { Country } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['countryWithEvaluationInfoList'],
    queryFn: async () => await Country.getCountryWithEvaluationInfoList(),
  })

  return { countryWithEvaluationInfoList: data, ...rest }
}

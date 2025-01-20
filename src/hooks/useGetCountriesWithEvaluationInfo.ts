import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountriesWithEvaluationInfo = () => {
  const { Country } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await Country.getCountryWithEvaluationInfoList(),
  })

  return { countries: data, ...rest }
}

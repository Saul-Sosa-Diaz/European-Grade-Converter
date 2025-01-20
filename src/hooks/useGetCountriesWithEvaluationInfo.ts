import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountriesWithEvaluationInfo = () => {
  const { Countries } = useApi()
  const { data, ...rest} = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await Countries.getCountriesWithEvaluationInfo(),
  })

  return { countries: data, ...rest }
}

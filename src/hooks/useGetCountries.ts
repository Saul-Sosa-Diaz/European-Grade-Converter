import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountries = () => {
  const { Countries } = useApi()
  const { data, ...rest} = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await Countries.getCountries(),
  })

  return { countries: data, ...rest }
}

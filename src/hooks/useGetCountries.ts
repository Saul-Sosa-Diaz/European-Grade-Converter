import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountries = () => {
  const api = useApi()
  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await api.getCountries(),
  })

  return { countries: data, isLoading }
}

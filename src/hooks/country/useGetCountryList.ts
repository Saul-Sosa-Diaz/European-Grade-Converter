import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetCountryList = () => {
  const { Country } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['countryList'],
    queryFn: async () => await Country.getCountryList(),
  })

  return { countryList: data, ...rest }
}

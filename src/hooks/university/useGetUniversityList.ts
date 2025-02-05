import { useApi } from '@/context/ApiContext'
import { useQuery } from '@tanstack/react-query'

export const useGetUniversityList = () => {
  const { University } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['universityList'],
    queryFn: async () => await University.getUniversityList(),
  })

  return { universityList: data, ...rest }
}

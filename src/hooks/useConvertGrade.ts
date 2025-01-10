import { useApi } from '@/context/ApiContext'
import { ConvertGrade } from '@/domain/grades/gradesRepository'
import { useQuery } from '@tanstack/react-query'

export const useConvertGrade = (params: ConvertGrade.Params) => {
  const { Grades } = useApi()
  const { data, ...rest } = useQuery({
    queryKey: ['convert-grade', params],
    queryFn: async () => await Grades.convertGrade(params),
  })

  return { countries: data, ...rest }
}

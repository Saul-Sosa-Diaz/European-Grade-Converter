import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

export const useCreateUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.createUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

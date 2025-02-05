import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.deleteUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

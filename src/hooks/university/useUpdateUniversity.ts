import { useApi } from '@/context/ApiContext'
import { University } from '@/domain/university/university'
import { useMutation } from '@tanstack/react-query'

export const useUpdateUniversity = () => {
  const { University } = useApi()

  const mutation = useMutation({
    mutationFn: async (university: University) => {
      const response = await University.updateUniversity(university)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateUniversity: mutation.mutateAsync,
    ...mutation,
  }
}

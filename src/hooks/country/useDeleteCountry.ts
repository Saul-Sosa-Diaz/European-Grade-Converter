import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.deleteCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteCountry: mutation.mutateAsync,
    ...mutation,
  }
}

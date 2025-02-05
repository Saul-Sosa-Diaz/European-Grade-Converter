import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

export const useCreateCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.createCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    createCountry: mutation.mutateAsync,
    ...mutation,
  }
}

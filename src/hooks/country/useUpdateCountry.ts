import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

export const useUpdateCountry = () => {
  const { Country } = useApi()

  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      const response = await Country.updateCountry(country)
      return response
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateCountry: mutation.mutateAsync,
    ...mutation,
  }
}

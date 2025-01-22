import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

export const useCreateCountry = () => {
  const { Country } = useApi()
  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      Country.createCountry(country)
    },
  })

  return {
    createCountry: mutation.mutate,
    ...mutation,
  }
}

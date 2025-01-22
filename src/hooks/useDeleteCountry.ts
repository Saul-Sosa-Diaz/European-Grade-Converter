import { useApi } from '@/context/ApiContext'
import { Country } from '@/domain/country/country'
import { useMutation } from '@tanstack/react-query'

export const useDeleteCountry = () => {
  const { Country } = useApi()
  const mutation = useMutation({
    mutationFn: async (country: Country) => {
      Country.deleteCountry(country)
    },
  })

  return {
    deleteCountry: mutation.mutate,
    ...mutation,
  }
}

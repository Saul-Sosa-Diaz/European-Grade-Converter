import { useApi } from "@/context/ApiContext"
import { Country } from "@/domain/country/country"
import { useMutation } from "@tanstack/react-query"

export const useUpdateCountry = () => {
  const { Country } = useApi()
  const mutation = useMutation({
    mutationFn: async (country: Country) => { console.log("aaa", country.name); Country.updateCountry(country)},
  })

  return {
    updateCountry: mutation.mutate,
    ...mutation,
  }
}


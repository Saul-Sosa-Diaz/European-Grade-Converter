import { CountriesRepository } from '@/domain/countries/countryRepository'

export function createCountryRepository(): CountriesRepository {
  return {
    getCountries: async () => {
      const { countries } = await fetch('/api/countries', {
        method: 'get',
      }).then((response) => {
        return response.json()
      })

      return countries
    },
  }
}

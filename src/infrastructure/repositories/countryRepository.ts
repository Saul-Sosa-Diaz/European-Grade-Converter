import { CountriesRepository } from '@/domain/auth/countryRepository'

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

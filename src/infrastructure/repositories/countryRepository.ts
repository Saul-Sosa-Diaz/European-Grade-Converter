import { mapApiGetcountries } from '@/application/countries/mapGetCountries'
import { CountriesRepository } from '@/domain/countries/countryRepository'

export function createCountryRepository(): CountriesRepository {
  return {
    getCountries: async () => {
      const { countries } = await fetch('/api/countries', { method: 'get' })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      const mappedCountries = await mapApiGetcountries(countries)
      return mappedCountries
    },
  }
}

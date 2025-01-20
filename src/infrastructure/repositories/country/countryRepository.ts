import { buildCountryEvaluationMap } from '@/application/country/mapGetCountries'
import { CountriesRepository } from '@/domain/country/countryRepository'

export function createCountryRepository(): CountriesRepository {
  return {
    getCountriesWithEvaluationInfo: async () => {
      const { countries } = await fetch('/api/countries-with-evaluation-info', { method: 'get' })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      const mappedCountries = await buildCountryEvaluationMap(countries)
      return mappedCountries
    },
  }
}

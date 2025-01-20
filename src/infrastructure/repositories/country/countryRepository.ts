import { buildCountryEvaluationMap } from '@/application/country/mapGetCountriesWithEvaluationInfoList'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepository(): CountryRepository {
  return {
    getCountriesWithEvaluationInfoList: async () => {
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

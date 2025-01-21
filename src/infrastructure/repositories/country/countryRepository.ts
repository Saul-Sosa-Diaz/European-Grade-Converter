import { buildCountryListMap } from '@/application/country/getCountryList/mapGetCountryList'
import { buildCountryEvaluationMap } from '@/application/country/getCountryWithEvaluationInfoList/mapGetCountryWithEvaluationInfoList'
import { buildAPICountry } from '@/application/country/updateCountry/mapUpdateCountry'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepository(): CountryRepository {
  return {
    getCountryWithEvaluationInfoList: async () => {
      const { countries } = await fetch('/api/country-with-evaluation-info-list', {
        method: 'get',
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
      const mappedCountriesWithEvaluationInfo = await buildCountryEvaluationMap(countries)
      return mappedCountriesWithEvaluationInfo
    },
    getCountryList: async () => {
      const { countries } = await fetch('/api/country-list', { method: 'get' })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })

        const mappedCountryList = await buildCountryListMap(countries)
        return mappedCountryList
    },
    updateCountry: async (country) => { // TODO: SECURIZE THIS
      const mappedCountry = await buildAPICountry(country)
      await fetch('/api/update-country', {
        method: 'post',
        body: JSON.stringify(mappedCountry),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
    }
  }
}

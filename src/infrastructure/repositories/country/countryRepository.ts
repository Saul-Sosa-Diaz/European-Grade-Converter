import { buildCountryListMap } from '@/application/country/getCountryList/mapGetCountryList'
import { buildCountryEvaluationMap } from '@/application/country/getCountryWithEvaluationInfoList/mapGetCountryWithEvaluationInfoList'
import { buildAPICountry } from '@/application/country/mapAPICountry'
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
    // TODO: SECURIZE THESE
    updateCountry: async (country) => {
      const mappedCountry = await buildAPICountry(country)
      await fetch('/api/update-country', {
        method: 'post',
        body: JSON.stringify(mappedCountry),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
    },
    createCountry: async (country) => {
      const mappedCountry = await buildAPICountry(country)
      await fetch('/api/create-country', {
        method: 'post',
        body: JSON.stringify(mappedCountry),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
    },
    deleteCountry: async (country) => {
      const mappedCountry = await buildAPICountry(country)
      await fetch('/api/delete-country', {
        method: 'post',
        body: JSON.stringify(mappedCountry),
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })
    },
  }
}

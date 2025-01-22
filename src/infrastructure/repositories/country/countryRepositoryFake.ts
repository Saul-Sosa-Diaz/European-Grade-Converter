import { COUNTRIES } from '../../fixture/countries'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepositoryFake(): CountryRepository {
  return {
    getCountryWithEvaluationInfoList: async () => COUNTRIES,
    getCountryList: async () => {
      COUNTRY_LIST
    },
    updateCountry: async (country) => {
      // Use the country parameter
      console.log(country)
      return
    },
    createCountry: async (country) => {
      console.log(country)
      return
    },
    deleteCountry: async (country) => {
      console.log(country)
      return
    },
  }
}

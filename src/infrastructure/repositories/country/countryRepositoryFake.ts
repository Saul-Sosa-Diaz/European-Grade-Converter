import { COUNTRIES, COUNTRY_LIST } from '../../fixture/countries'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepositoryFake(): CountryRepository {
  return {
    getCountryWithEvaluationInfoList: async () => COUNTRIES,
    getCountryList: async () => {
      return COUNTRY_LIST  
    },
    updateCountry: async (country) => {
      // Use the country parameter
      console.log(country)
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

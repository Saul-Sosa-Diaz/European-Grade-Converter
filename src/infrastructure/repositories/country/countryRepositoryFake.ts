import { COUNTRIES } from '../../fixture/countries'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepositoryFake(): CountryRepository {
  return {
    getCountriesWithEvaluationInfoList: async () => COUNTRIES,
  }
}

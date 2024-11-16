import { COUNTRIES } from "../fixture/countries";
import { CountriesRepository } from '@/domain/countries/countryRepository'
export function createProductsRepositoryFake(): CountriesRepository {
  return {
    getCountries: async () => COUNTRIES,
  }
}

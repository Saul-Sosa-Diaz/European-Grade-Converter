import { CountriesRepository, GetCountries } from '../domain/countries/countryRepository'

export function getCountries(countriesRepository: CountriesRepository): GetCountries.Request {
  return async () => await countriesRepository.getCountries()
}

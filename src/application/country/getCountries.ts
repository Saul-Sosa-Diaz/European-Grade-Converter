import { CountriesRepository, GetCountries } from '../../domain/country/countryRepository'

export function getCountries(countriesRepository: CountriesRepository): GetCountries.Request {
  return async () => await countriesRepository.getCountries()
}

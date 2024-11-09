import { CountriesRepository, GetCountries } from "../domain/countries/countryrepository";


export function getCountries(countriesRepository: CountriesRepository): GetCountries.Request {
  return async (params) => await countriesRepository.getCountries(params)
}
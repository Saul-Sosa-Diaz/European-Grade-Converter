import {
  CountryRepository,
  GetCountryList,
} from '../../../domain/country/countryRepository'

export function getCountryList(countryRepository: CountryRepository): GetCountryList.Request {
  return async () => await countryRepository.getCountryList()
}

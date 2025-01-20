import {
  CountryRepository,
  GetCountryWithEvaluationInfoList,
} from '../../domain/country/countryRepository'

export function getCountriesWithEvaluationInfoList(
  countriesRepository: CountryRepository,
): GetCountryWithEvaluationInfoList.Request {
  return async () => await countriesRepository.getCountriesWithEvaluationInfoList()
}

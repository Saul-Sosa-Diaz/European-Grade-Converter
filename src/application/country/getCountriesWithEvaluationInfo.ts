import {
  CountriesRepository,
  GetCountriesWithEvaluationInfo,
} from '../../domain/country/countryRepository'

export function getCountriesWithEvaluationInfo(
  countriesRepository: CountriesRepository,
): GetCountriesWithEvaluationInfo.Request {
  return async () => await countriesRepository.getCountriesWithEvaluationInfo()
}

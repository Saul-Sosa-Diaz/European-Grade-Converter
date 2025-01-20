import {
  CountryRepository,
  GetCountryWithEvaluationInfoList,
} from '../../../domain/country/countryRepository'

export function getCountryList(
  countriesRepository: CountryRepository,
): GetCountryWithEvaluationInfoList.Request {
  return async () => await countriesRepository.getCountryWithEvaluationInfoList()
}

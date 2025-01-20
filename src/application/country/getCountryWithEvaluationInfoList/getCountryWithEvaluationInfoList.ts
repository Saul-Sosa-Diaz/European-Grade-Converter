import {
  CountryRepository,
  GetCountryWithEvaluationInfoList,
} from '../../../domain/country/countryRepository'

export function getCountryWithEvaluationInfoList(
  countriesRepository: CountryRepository,
): GetCountryWithEvaluationInfoList.Request {
  return async () => await countriesRepository.getCountryWithEvaluationInfoList()
}

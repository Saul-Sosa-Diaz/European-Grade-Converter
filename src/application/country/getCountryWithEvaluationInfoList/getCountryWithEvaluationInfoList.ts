import {
  CountryRepository,
  GetCountryWithEvaluationInfoList,
} from '../../../domain/country/countryRepository'

export function getCountryWithEvaluationInfoList(
  countryRepository: CountryRepository,
): GetCountryWithEvaluationInfoList.Request {
  return async () => await countryRepository.getCountryWithEvaluationInfoList()
}

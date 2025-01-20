import type { Country, CountryWithEvaluationInfo } from './country'

export namespace GetCountryWithEvaluationInfoList {
  export type Params = void
  export type Response = CountryWithEvaluationInfo[]
  export type Request = (
    params: GetCountryWithEvaluationInfoList.Params,
  ) => Promise<GetCountryWithEvaluationInfoList.Response>
}

export namespace GetCountryList {
  export type Params = void
  export type Response = Country[]
  export type Request = (params: GetCountryList.Params) => Promise<GetCountryList.Response>
}

export interface CountryRepository {
  getCountriesWithEvaluationInfoList: GetCountryWithEvaluationInfoList.Request
  getCountryList: GetCountryList.Request
}

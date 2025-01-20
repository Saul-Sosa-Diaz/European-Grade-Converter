import type { CountryWithEvaluationInfo } from './country'

export namespace GetCountriesWithEvaluationInfo {
  export type Params = void
  export type Response = CountryWithEvaluationInfo[]
  export type Request = (
    params: GetCountriesWithEvaluationInfo.Params,
  ) => Promise<GetCountriesWithEvaluationInfo.Response>
}

export interface CountriesRepository {
  getCountriesWithEvaluationInfo: GetCountriesWithEvaluationInfo.Request
}

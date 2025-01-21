
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
export namespace UpdateCountry {
  export type Params = Country
  export type Response = void
  export type Request = (params: UpdateCountry.Params) => Promise<UpdateCountry.Response>
}

export interface CountryRepository {
  getCountryWithEvaluationInfoList: GetCountryWithEvaluationInfoList.Request
  getCountryList: GetCountryList.Request
  updateCountry: UpdateCountry.Request
}

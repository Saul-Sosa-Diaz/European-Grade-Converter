import type { Country } from './country'

export namespace GetCountries {
  export type Params = { provider?: string }
  export type Response = Country[]
  export type Request = (params: GetCountries.Params) => Promise<GetCountries.Response>
}


export interface CountriesRepository {
  getCountries: GetCountries.Request
}
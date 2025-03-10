/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the repository interface and types for country-related operations.
 * It defines the parameters and response types for retrieving, updating, creating, and deleting countries.
 *
 * @date February 18, 2025
 * @description This file has the repository interface and types for country-related operations.
 * @author Saul Sosa
 */

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
export namespace CreateCountry {
  export type Params = Country
  export type Response = void
  export type Request = (params: CreateCountry.Params) => Promise<CreateCountry.Response>
}

export namespace DeleteCountry {
  export type Params = Country
  export type Response = void
  export type Request = (params: DeleteCountry.Params) => Promise<DeleteCountry.Response>
}
export interface CountryRepository {
  getCountryWithEvaluationInfoList: GetCountryWithEvaluationInfoList.Request
  getCountryList: GetCountryList.Request
  updateCountry: UpdateCountry.Request
  createCountry: CreateCountry.Request
  deleteCountry: DeleteCountry.Request
}

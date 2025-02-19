/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the repository interface and types for university-related operations.
 * It defines the parameters and response types for retrieving, updating, creating, and deleting universities.
 *
 * @date February 18, 2025
 * @description This file has the repository interface and types for university-related operations.
 * @author Saul Sosa
 */

import type { University } from './university'

export namespace GetUniversityList {
  export type Params = void
  export type Response = University[]
  export type Request = (params: GetUniversityList.Params) => Promise<GetUniversityList.Response>
}
export namespace UpdateUniversity {
  export type Params = University
  export type Response = void
  export type Request = (params: UpdateUniversity.Params) => Promise<UpdateUniversity.Response>
}
export namespace CreateUniversity {
  export type Params = University
  export type Response = void
  export type Request = (params: CreateUniversity.Params) => Promise<CreateUniversity.Response>
}

export namespace DeleteUniversity {
  export type Params = University
  export type Response = void
  export type Request = (params: DeleteUniversity.Params) => Promise<DeleteUniversity.Response>
}
export interface UniversityRepository {
  getUniversityList: GetUniversityList.Request
  updateUniversity: UpdateUniversity.Request
  createUniversity: CreateUniversity.Request
  deleteUniversity: DeleteUniversity.Request
}

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

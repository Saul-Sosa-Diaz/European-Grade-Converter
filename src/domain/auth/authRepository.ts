import type { Credentials } from './auth'

export namespace SignIn {
  export type Params = Credentials 
  export type Response = void
  export type Request = (params: SignIn.Params) => Promise<SignIn.Response>
}

export interface AuthRepository {
  signIn: SignIn.Request
}

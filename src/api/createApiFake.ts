import { createProductsRepositoryFake } from '../infrastructure/repositories/countryRepositoryFake'
import { Api } from './domain/Api'
import { getCountries } from '../application/getCountries'
import { createAuthRepositoryFake } from '@/infrastructure/repositories/auth/authRepositoryFake'
import { signIn } from '@/application/auth/signIn'


export function createApiFake(): Api {
  const COUNTRIES_REPOSITORY = createProductsRepositoryFake()
  const AUTH_REPOSITORY = createAuthRepositoryFake()
  return {
    Countries: {
      getCountries: getCountries(COUNTRIES_REPOSITORY),
    },
    Auth: {
      signIn: signIn(AUTH_REPOSITORY),
    },
  }
}

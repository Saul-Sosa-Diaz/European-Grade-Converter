import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/countryRepository'
import { getCountries } from '@/application/getCountries'
import { Api } from './domain/Api'
import { createAuthRepository } from '@/infrastructure/repositories/auth/authRepository'
import { signIn } from '@/application/auth/signIn'

export function createApi(): Api {
  if (process.env.DEBUG) return createApiFake()

  const countriesRepository = createCountryRepository()
  const authRepository = createAuthRepository()

  return {
    Countries: {
      getCountries: getCountries(countriesRepository),
    },
    Auth: {
      signIn: signIn(authRepository),
    },
  }
}

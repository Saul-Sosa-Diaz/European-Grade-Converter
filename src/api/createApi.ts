import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/countryRepository'
import { getCountries } from '@/application/countries/getCountries'
import { Api } from './domain/Api'
import { createAuthRepository } from '@/infrastructure/repositories/auth/authRepository'
import { signIn } from '@/application/auth/signIn'

type CreateApiProps = {
  offline?: boolean
}
export function createApi({ offline = false }: CreateApiProps): Api {
  if (offline) return createApiFake()

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

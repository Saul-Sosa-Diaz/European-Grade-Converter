import { AuthRepository } from '@/domain/auth/authRepository'
import { CountriesRepository } from '@/domain/countries/countryRepository'

export interface Api {
  Countries: CountriesRepository
  Auth: AuthRepository
}

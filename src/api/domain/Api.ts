import { AuthRepository } from '@/domain/auth/authRepository'
import { CountriesRepository } from '@/domain/country/countryRepository'
import { GradesRepository } from '@/domain/grades/gradesRepository'

export interface Api {
  Countries: CountriesRepository
  Grades: GradesRepository
  Auth: AuthRepository
}

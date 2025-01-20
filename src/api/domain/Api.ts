import { AuthRepository } from '@/domain/auth/authRepository'
import { CountryRepository } from '@/domain/country/countryRepository'
import { GradesRepository } from '@/domain/grades/gradesRepository'

export interface Api {
  Country: CountryRepository
  Grades: GradesRepository
  Auth: AuthRepository
}

import { AuthRepository } from '@/domain/auth/authRepository'
import { CountryRepository } from '@/domain/country/countryRepository'
import { GradesRepository } from '@/domain/grades/gradesRepository'
import { UniversityRepository } from '@/domain/university/universityRepository'

export interface Api {
  Country: CountryRepository
  University: UniversityRepository
  Grades: GradesRepository
  Auth: AuthRepository
}

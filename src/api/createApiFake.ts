import { Api } from './domain/Api'
import { getCountries } from '../application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { createAuthRepositoryFake } from '@/infrastructure/repositories/auth/authRepositoryFake'
import { signIn } from '@/application/auth/signIn'
import { createCountryRepositoryFake } from '@/infrastructure/repositories/country/countryRepositoryFake'
import { createGradeRepositoryFake } from '@/infrastructure/repositories/grades/gradesRepositoryFake'
import { convertGrade } from '@/application/grades/calculateConversion.ts'

export function createApiFake(): Api {
  const COUNTRIES_REPOSITORY = createCountryRepositoryFake()
  const AUTH_REPOSITORY = createAuthRepositoryFake()
  const GRADES_REPOSITORY = createGradeRepositoryFake()
  return {
    Countries: {
      getCountries: getCountries(COUNTRIES_REPOSITORY),
    },
    Grades: {
      convertGrade: convertGrade(GRADES_REPOSITORY),
    },
    Auth: {
      signIn: signIn(AUTH_REPOSITORY),
    },
  }
}

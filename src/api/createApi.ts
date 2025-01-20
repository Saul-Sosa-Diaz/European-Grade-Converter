import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/country/countryRepository'
import { getCountriesWithEvaluationInfo } from '@/application/country/getCountriesWithEvaluationInfo'
import { Api } from './domain/Api'
import { createAuthRepository } from '@/infrastructure/repositories/auth/authRepository'
import { signIn } from '@/application/auth/signIn'
import { createGradeRepository } from '@/infrastructure/repositories/grades/gradesRepository'
import { convertGrade } from '@/application/grades/calculateConversion.ts'

type CreateApiProps = {
  offline?: boolean
}
export function createApi({ offline = false }: CreateApiProps): Api {
  if (offline) return createApiFake()

  const countriesRepository = createCountryRepository()
  const authRepository = createAuthRepository()
  const gradesRepository = createGradeRepository()
  return {
    Countries: {
      getCountriesWithEvaluationInfo: getCountriesWithEvaluationInfo(countriesRepository),
    },
    Grades: {
      convertGrade: convertGrade(gradesRepository),
    },
    Auth: {
      signIn: signIn(authRepository),
    },
  }
}

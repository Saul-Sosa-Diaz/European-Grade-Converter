import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/country/countryRepository'
import { getCountriesWithEvaluationInfoList } from '@/application/country/getCountriesWithEvaluationInfoList'
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
      getCountriesWithEvaluationInfoList: getCountriesWithEvaluationInfoList(countriesRepository),
    },
    Grades: {
      convertGrade: convertGrade(gradesRepository),
    },
    Auth: {
      signIn: signIn(authRepository),
    },
  }
}

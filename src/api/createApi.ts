import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/country/countryRepository'

import { Api } from './domain/Api'
import { createAuthRepository } from '@/infrastructure/repositories/auth/authRepository'
import { signIn } from '@/application/auth/signIn'
import { createGradeRepository } from '@/infrastructure/repositories/grades/gradesRepository'
import { convertGrade } from '@/application/grades/calculateConversion.ts'
import { getCountryWithEvaluationInfoList } from '@/application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { getCountryList } from '@/application/country/getCountryList/getCountryList'
import { updateCountry } from '@/application/country/updateCountry/updateCountry'
import { createCountry } from '@/application/country/createCountry/createCountry'
import { deleteCountry } from '@/application/country/deleteCountry/deleteCountry'

type CreateApiProps = {
  offline?: boolean
}
export function createApi({ offline = false }: CreateApiProps): Api {
  if (offline) return createApiFake()

  const countryRepository = createCountryRepository()
  const authRepository = createAuthRepository()
  const gradesRepository = createGradeRepository()
  return {
    Country: {
      getCountryWithEvaluationInfoList: getCountryWithEvaluationInfoList(countryRepository),
      getCountryList: getCountryList(countryRepository),
      updateCountry: updateCountry(countryRepository),
      createCountry: createCountry(countryRepository),
      deleteCountry: deleteCountry(countryRepository)
    },
    Grades: {
      convertGrade: convertGrade(gradesRepository),
    },
    Auth: {
      signIn: signIn(authRepository),
    },
  }
}

import { Api } from './domain/Api'
import { getCountryWithEvaluationInfoList } from '../application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { createAuthRepositoryFake } from '@/infrastructure/repositories/auth/authRepositoryFake'
import { signIn } from '@/application/auth/signIn'
import { createCountryRepositoryFake } from '@/infrastructure/repositories/country/countryRepositoryFake'
import { createGradeRepositoryFake } from '@/infrastructure/repositories/grades/gradesRepositoryFake'
import { convertGrade } from '@/application/grades/calculateConversion.ts'
import { getCountryList } from '@/application/country/getCountryList/getCountryList'
import { updateCountry } from '@/application/country/updateCountry/updateCountry'

export function createApiFake(): Api {
  const COUNTRY_REPOSITORY = createCountryRepositoryFake()
  const AUTH_REPOSITORY = createAuthRepositoryFake()
  const GRADES_REPOSITORY = createGradeRepositoryFake()
  return {
    Country: {
      getCountryWithEvaluationInfoList: getCountryWithEvaluationInfoList(COUNTRY_REPOSITORY),
      getCountryList: getCountryList(COUNTRY_REPOSITORY),
      updateCountry: updateCountry(COUNTRY_REPOSITORY),
    },
    Grades: {
      convertGrade: convertGrade(GRADES_REPOSITORY),
    },
    Auth: {
      signIn: signIn(AUTH_REPOSITORY),
    },
  }
}

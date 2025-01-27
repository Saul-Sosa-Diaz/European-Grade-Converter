import { Api } from './domain/Api'
import { getCountryWithEvaluationInfoList } from '../application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { createAuthRepositoryFake } from '@/infrastructure/repositories/auth/authRepositoryFake'
import { signIn } from '@/application/auth/signIn'
import { createCountryRepositoryFake } from '@/infrastructure/repositories/country/countryRepositoryFake'
import { createEvaluationSystemRepositoryFake } from '@/infrastructure/repositories/evaluationSystem/evaluationSystemRepositoryFake'
import { convertGrade } from '@/application/evaluationSystem/calculateConversion.ts'
import { getCountryList } from '@/application/country/getCountryList/getCountryList'
import { updateCountry } from '@/application/country/updateCountry/updateCountry'
import { createCountry } from '@/application/country/createCountry/createCountry'
import { deleteCountry } from '@/application/country/deleteCountry/deleteCountry'
import { getUniversityList } from '@/application/university/getUniversityList/getUniversityList'
import { updateUniversity } from '@/application/university/updateUniversity/updateCountry'
import { createUniversity } from '@/application/university/createUniversity/createUniversity'
import { deleteUniversity } from '@/application/university/deleteUniversity/deleteUniversity'
import { createUniversityRepositoryFake } from '@/infrastructure/repositories/university/universityRepositoryFake'

export function createApiFake(): Api {
  const FAKE_COUNTRY_REPOSITORY = createCountryRepositoryFake()
  const FAKE_UNIVERSITY_REPOSITORY = createUniversityRepositoryFake()
  const FAKE_AUTH_REPOSITORY = createAuthRepositoryFake()
  const FAKE_GRADES_REPOSITORY = createEvaluationSystemRepositoryFake()
  return {
    Country: {
      getCountryWithEvaluationInfoList: getCountryWithEvaluationInfoList(FAKE_COUNTRY_REPOSITORY),
      getCountryList: getCountryList(FAKE_COUNTRY_REPOSITORY),
      updateCountry: updateCountry(FAKE_COUNTRY_REPOSITORY),
      createCountry: createCountry(FAKE_COUNTRY_REPOSITORY),
      deleteCountry: deleteCountry(FAKE_COUNTRY_REPOSITORY),
    },
    University: {
      getUniversityList: getUniversityList(FAKE_UNIVERSITY_REPOSITORY),
      updateUniversity: updateUniversity(FAKE_UNIVERSITY_REPOSITORY),
      createUniversity: createUniversity(FAKE_UNIVERSITY_REPOSITORY),
      deleteUniversity: deleteUniversity(FAKE_UNIVERSITY_REPOSITORY),
    },
    EvaluationSystem: {
      convertGrade: convertGrade(FAKE_GRADES_REPOSITORY),
    },
    Auth: {
      signIn: signIn(FAKE_AUTH_REPOSITORY),
    },
  }
}

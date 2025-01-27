import { Api } from './domain/Api'
import { getCountryWithEvaluationInfoList } from '../application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { createAuthRepositoryFake } from '@/infrastructure/repositories/auth/authRepositoryFake'
import { signIn } from '@/application/auth/signIn'
import { createCountryRepositoryFake } from '@/infrastructure/repositories/country/countryRepositoryFake'
import { createEvaluationSystemRepositoryFake } from '@/infrastructure/repositories/evaluationSystem/evaluationSystemRepositoryFake'
import { convertGrade } from '@/application/evaluationSystem/calculateConversion.ts'
import { getCountryList } from '@/application/country/getCountryList/getCountryList'
import { updateCountry } from '@/application/country/updateCountry'
import { createCountry } from '@/application/country/createCountry'
import { deleteCountry } from '@/application/country/deleteCountry'
import { getUniversityList } from '@/application/university/getUniversityList/getUniversityList'
import { updateUniversity } from '@/application/university/updateCountry'
import { createUniversity } from '@/application/university/createUniversity'
import { deleteUniversity } from '@/application/university/deleteUniversity'
import { createUniversityRepositoryFake } from '@/infrastructure/repositories/university/universityRepositoryFake'
import { getEvaluationSystemList } from '@/application/evaluationSystem/getEvaluationSystemList/getEvaluationSystemList'
import { updateEvaluationSystem } from '@/application/evaluationSystem/updateEvaluationSystem'
import { createEvaluationSystem } from '@/application/evaluationSystem/createEvaluationSystem'
import { deleteEvaluationSystem } from '@/application/evaluationSystem/deleteEvaluationSystem'

export function createApiFake(): Api {
  const FAKE_COUNTRY_REPOSITORY = createCountryRepositoryFake()
  const FAKE_UNIVERSITY_REPOSITORY = createUniversityRepositoryFake()
  const FAKE_AUTH_REPOSITORY = createAuthRepositoryFake()
  const FAKE_EVALUATION_SYSTEM_REPOSITORY = createEvaluationSystemRepositoryFake()
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
      convertGrade: convertGrade(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      getEvaluationSystemList: getEvaluationSystemList(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      updateEvaluationSystem: updateEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      createEvaluationSystem: createEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      deleteEvaluationSystem: deleteEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
    },
    Auth: {
      signIn: signIn(FAKE_AUTH_REPOSITORY),
    },
  }
}

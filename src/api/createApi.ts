import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/country/countryRepository'

import { Api } from './domain/Api'
import { createAuthRepository } from '@/infrastructure/repositories/auth/authRepository'
import { signIn } from '@/application/auth/signIn'
import { createEvaluationSystemRepository } from '@/infrastructure/repositories/evaluationSystem/evaluationSystemRepository'
import { convertGrade } from '@/application/evaluationSystem/calculateConversion.ts'
import { getCountryWithEvaluationInfoList } from '@/application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { getCountryList } from '@/application/country/getCountryList/getCountryList'
import { updateCountry } from '@/application/country/updateCountry'
import { createCountry } from '@/application/country/createCountry'
import { deleteCountry } from '@/application/country/deleteCountry'
import { getUniversityList } from '@/application/university/getUniversityList/getUniversityList'
import { updateUniversity } from '@/application/university/updateCountry'
import { createUniversity } from '@/application/university/createUniversity'
import { deleteUniversity } from '@/application/university/deleteUniversity'
import { createUniversityRepository } from '@/infrastructure/repositories/university/universityRepository'
import { getEvaluationSystemList } from '@/application/evaluationSystem/getEvaluationSystemList/getEvaluationSystemList'
import { updateEvaluationSystem } from '@/application/evaluationSystem/updateEvaluationSystem'
import { createEvaluationSystem } from '@/application/evaluationSystem/createEvaluationSystem'
import { deleteEvaluationSystem } from '@/application/evaluationSystem/deleteEvaluationSystem'
import { getContinouosGradeConversionListByEvaluationID } from '@/application/evaluationSystem/getContinuousGradeConversionListByEvaluationID/getContinuousGradeConversion'

type CreateApiProps = {
  offline?: boolean
}
export function createApi({ offline = false }: CreateApiProps): Api {
  if (offline) return createApiFake()

  const countryRepository = createCountryRepository()
  const authRepository = createAuthRepository()
  const evaluationSystemRepository = createEvaluationSystemRepository()
  const universityRepository = createUniversityRepository()
  return {
    Country: {
      getCountryWithEvaluationInfoList: getCountryWithEvaluationInfoList(countryRepository),
      getCountryList: getCountryList(countryRepository),
      updateCountry: updateCountry(countryRepository),
      createCountry: createCountry(countryRepository),
      deleteCountry: deleteCountry(countryRepository),
    },
    University: {
      getUniversityList: getUniversityList(universityRepository),
      updateUniversity: updateUniversity(universityRepository),
      createUniversity: createUniversity(universityRepository),
      deleteUniversity: deleteUniversity(universityRepository),
    },
    EvaluationSystem: {
      convertGrade: convertGrade(evaluationSystemRepository),
      getEvaluationSystemList: getEvaluationSystemList(evaluationSystemRepository),
      getContinouosGradeConversionListByEvaluationID:
        getContinouosGradeConversionListByEvaluationID(evaluationSystemRepository),
      updateEvaluationSystem: updateEvaluationSystem(evaluationSystemRepository),
      createEvaluationSystem: createEvaluationSystem(evaluationSystemRepository),
      deleteEvaluationSystem: deleteEvaluationSystem(evaluationSystemRepository),
    },
    Auth: {
      signIn: signIn(authRepository),
    },
  }
}

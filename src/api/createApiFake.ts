/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for creating a fake API.
 * It sets up the fake repositories for country, university, evaluation system, authentication,
 * and grade conversion functionalities.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the implementation for creating a fake API.
 * @author Saul Sosa
 */

import { Api } from './domain/Api'
import { getCountryWithEvaluationInfoList } from '../application/country/getCountryWithEvaluationInfoList/getCountryWithEvaluationInfoList'
import { createCountryRepositoryFake } from '@/infrastructure/repositories/country/countryRepositoryFake'
import { createEvaluationSystemRepositoryFake } from '@/infrastructure/repositories/evaluationSystem/evaluationSystemRepositoryFake'
import { convertGrade } from '@/application/converter/convertGrade.ts'
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
import { getGradeConversionListByEvaluationID } from '@/application/evaluationSystem/getGradeConversionListByEvaluationID/getGradeConversion'
import { createConverterRepositoryFake } from '@/infrastructure/repositories/converter/converterRepositoryFake'

export function createApiFake(): Api {
  const FAKE_COUNTRY_REPOSITORY = createCountryRepositoryFake()
  const FAKE_UNIVERSITY_REPOSITORY = createUniversityRepositoryFake()
  const FAKE_EVALUATION_SYSTEM_REPOSITORY = createEvaluationSystemRepositoryFake()
  const FAKE_CONVERTER_REPOSITORY = createConverterRepositoryFake()
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
      getEvaluationSystemList: getEvaluationSystemList(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      getGradeConversionListByEvaluationID: getGradeConversionListByEvaluationID(
        FAKE_EVALUATION_SYSTEM_REPOSITORY,
      ),
      updateEvaluationSystem: updateEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      createEvaluationSystem: createEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
      deleteEvaluationSystem: deleteEvaluationSystem(FAKE_EVALUATION_SYSTEM_REPOSITORY),
    },
    Converter: {
      convertGrade: convertGrade(FAKE_CONVERTER_REPOSITORY),
    },
  }
}

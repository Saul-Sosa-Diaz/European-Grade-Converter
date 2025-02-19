/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for creating the API.
 * It sets up the repositories for country, university, evaluation system, authentication,
 * and grade conversion functionalities.
 *
 * @date February 18, 2025
 * @description This file has the implementation for creating the API.
 * @author Saul Sosa
 */

import { createApiFake } from './createApiFake'
import { createCountryRepository } from '../infrastructure/repositories/country/countryRepository'
import { Api } from './domain/Api'
import { createEvaluationSystemRepository } from '@/infrastructure/repositories/evaluationSystem/evaluationSystemRepository'
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
import { getGradeConversionListByEvaluationID } from '@/application/evaluationSystem/getGradeConversionListByEvaluationID/getGradeConversion'
import { createConverterRepository } from '@/infrastructure/repositories/converter/converterRepository'
import { convertGrade } from '@/application/converter/convertGrade.ts'

type CreateApiProps = {
  offline?: boolean
}
export function createApi({ offline = false }: CreateApiProps): Api {
  if (offline) return createApiFake()

  const countryRepository = createCountryRepository()
  const evaluationSystemRepository = createEvaluationSystemRepository()
  const universityRepository = createUniversityRepository()
  const converterRepository = createConverterRepository()
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
      getEvaluationSystemList: getEvaluationSystemList(evaluationSystemRepository),
      getGradeConversionListByEvaluationID: getGradeConversionListByEvaluationID(
        evaluationSystemRepository,
      ),
      updateEvaluationSystem: updateEvaluationSystem(evaluationSystemRepository),
      createEvaluationSystem: createEvaluationSystem(evaluationSystemRepository),
      deleteEvaluationSystem: deleteEvaluationSystem(evaluationSystemRepository),
    },
    Converter: {
      convertGrade: convertGrade(converterRepository),
    },
  }
}

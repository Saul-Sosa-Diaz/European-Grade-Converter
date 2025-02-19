/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildCountryEvaluationMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as grouping records by country and university correctly.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildCountryEvaluationMap function.
 * @author Saul Sosa
 */
import { buildCountryEvaluationMap } from './mapGetCountryWithEvaluationInfoList'
import { APIGetCountryWithEvaluationInfoList } from '@/domain/country/dto/ApiCountry'
import { CountryWithEvaluationInfo } from '@/domain/country/country'
import {
  API_COUNTRY_WITH_EVALUATION_INFO_LIST,
  COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED,
} from '@/infrastructure/fixture/countries'

describe('buildCountryEvaluationMap', () => {
  it('should group records by country and university correctly', async () => {
    const dto: APIGetCountryWithEvaluationInfoList = API_COUNTRY_WITH_EVALUATION_INFO_LIST
    const result: CountryWithEvaluationInfo[] = await buildCountryEvaluationMap(dto)
    expect(result).toEqual(COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED)
  })

  it('should handle empty input', async () => {
    const dto: APIGetCountryWithEvaluationInfoList = []
    const result: CountryWithEvaluationInfo[] = await buildCountryEvaluationMap(dto)
    expect(result).toEqual([])
  })
})

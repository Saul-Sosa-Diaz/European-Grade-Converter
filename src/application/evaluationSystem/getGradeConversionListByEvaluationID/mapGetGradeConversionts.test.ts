/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildGradeConversionListByEvaluationIDMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping APIGradeConversion to GradeConversion correctly,
 * handling empty input arrays, and error handling.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the tests for the buildGradeConversionListByEvaluationIDMap function.
 * @author Saul Sosa
 */

import { buildGradeConversionListByEvaluationIDMap } from './mapGetGradeConversionts'
import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { GradeConversion, EuropeanEquivalence } from '@/domain/evaluationSystem/evaluationSystem'

describe('buildGradeConversionListByEvaluationIDMap', () => {
  it('should map APIGradeConversion to GradeConversion correctly', async () => {
    const apiGradeConversions: APIGradeConversion[] = [
      {
        gradeconversionid: '1',
        evaluationsystemid: '101',
        minintervalgrade: 0,
        maxintervalgrade: 10,
        gradename: 'A',
        gradevalue: '4',
        europeanequivalence: 'A' as EuropeanEquivalence,
      },
      {
        gradeconversionid: '2',
        evaluationsystemid: '102',
        minintervalgrade: 11,
        maxintervalgrade: 20,
        gradename: 'B',
        gradevalue: '3',
        europeanequivalence: 'B' as EuropeanEquivalence,
      },
    ]

    const expectedGradeConversions: GradeConversion[] = [
      {
        gradeConversionID: '1',
        evaluationSystemID: '101',
        MinIntervalGrade: 0,
        MaxIntervalGrade: 10,
        gradeName: 'A',
        gradeValue: '4',
        europeanEquivalence: 'A' as EuropeanEquivalence,
      },
      {
        gradeConversionID: '2',
        evaluationSystemID: '102',
        MinIntervalGrade: 11,
        MaxIntervalGrade: 20,
        gradeName: 'B',
        gradeValue: '3',
        europeanEquivalence: 'B' as EuropeanEquivalence,
      },
    ]

    const result = await buildGradeConversionListByEvaluationIDMap(apiGradeConversions)
    expect(result).toEqual(expectedGradeConversions)
  })

  it('should throw an error if mapping fails', async () => {
    const apiGradeConversions: APIGradeConversion[] = null

    await expect(buildGradeConversionListByEvaluationIDMap(apiGradeConversions)).rejects.toThrow(
      Error,
    )
  })
})

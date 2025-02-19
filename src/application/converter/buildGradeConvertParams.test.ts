/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildGradeConvertParams functions.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as building continuous and discrete grade convert parameters.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildGradeConvertParams functions.
 * @author Saul Sosa
 */
import { ContinuousGradeConvertParams, ConverterDirection } from '@/domain/converter/converter'
import { APIGradeConversion } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { buildContinuousGradeConvert, buildDiscreteGradeConvert } from './buildGradeConvertParams'
import { EuropeanEquivalence } from '@/domain/evaluationSystem/evaluationSystem'

describe('buildContinuousGradeConvert', () => {
  it('should build continuous grade convert params correctly', () => {
    const gradeConversions: APIGradeConversion = {
      minintervalgrade: 1,
      europeanequivalence: EuropeanEquivalence.A,
      evaluationsystemid: '1',
      gradeconversionid: '1',
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      maxintervalgrade: 20,
    }
    const grade = 'A'
    const direction: ConverterDirection = ConverterDirection.toSpain

    const result = buildContinuousGradeConvert({ gradeConversions, grade, direction })

    const expected: ContinuousGradeConvertParams = {
      conversion: {
        minintervalgrade: 1,
        baseequivalentspanishgrade: 5,
        topequivalentspanishgrade: 10,
        maxintervalgrade: 20,
      },
      grade,
      direction,
    }

    expect(result).toEqual(expected)
  })

  it('should build continuous grade convert params with undefined direction', () => {
    const gradeConversions: APIGradeConversion = {
      minintervalgrade: 1,
      europeanequivalence: EuropeanEquivalence.A,
      evaluationsystemid: '1',
      gradeconversionid: '1',
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      maxintervalgrade: 20,
    }
    const grade = 'A'

    const result = buildContinuousGradeConvert({ gradeConversions, grade })

    const expected: ContinuousGradeConvertParams = {
      conversion: {
        minintervalgrade: 1,
        baseequivalentspanishgrade: 5,
        topequivalentspanishgrade: 10,
        maxintervalgrade: 20,
      },
      grade,
      direction: undefined,
    }

    expect(result).toEqual(expected)
  })
})

describe('buildDiscreteGradeConvert', () => {
  it('should build discrete grade convert params correctly', () => {
    const gradeConversions: APIGradeConversion = {
      baseequivalentspanishgrade: 5,
      europeanequivalence: EuropeanEquivalence.A,
      evaluationsystemid: '1',
      gradeconversionid: '1',
      gradevalue: 'B',
      topequivalentspanishgrade: 10,
    }
    const specialGrade = true
    const grade = 'B'
    const direction: ConverterDirection = ConverterDirection.toSpain

    const result = buildDiscreteGradeConvert({ gradeConversions, specialGrade, direction })

    const expected = {
      conversion: {
        baseequivalentspanishgrade: 5,
        topequivalentspanishgrade: 10,
        gradevalue: grade,
      },
      specialGrade,
      direction,
    }

    expect(result).toEqual(expected)
  })

  it('should build discrete grade convert params with undefined specialGrade and direction', () => {
    const gradeConversions: APIGradeConversion = {
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      europeanequivalence: EuropeanEquivalence.A,
      evaluationsystemid: '1',
      gradeconversionid: '1',
      gradevalue: 'B',
    }
    const grade = 'B'

    const result = buildDiscreteGradeConvert({ gradeConversions })

    const expected = {
      conversion: {
        baseequivalentspanishgrade: 5,
        topequivalentspanishgrade: 10,
        gradevalue: grade,
      },
      specialGrade: undefined,
      direction: undefined,
    }

    expect(result).toEqual(expected)
  })
})

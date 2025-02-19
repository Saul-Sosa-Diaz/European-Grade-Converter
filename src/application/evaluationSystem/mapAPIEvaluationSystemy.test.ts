/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildAPIEvaluationSystem and buildAPIEvaluationSystemWithGradeConversions functions.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping EvaluationSystem to APIEvaluationSystem correctly,
 * handling empty input arrays, and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildAPIEvaluationSystem and buildAPIEvaluationSystemWithGradeConversions functions.
 * @author Saul Sosa
 */

import {
  buildAPIEvaluationSystem,
  buildAPIEvaluationSystemWithGradeConversions,
} from './mapAPIEvaluationSystemy'
import {
  EuropeanEquivalence,
  EvaluationSystem,
  EvaluationSystemWithGradeConversions,
  EvaluationType,
} from '@/domain/evaluationSystem/evaluationSystem'
import {
  APIEvaluationSystem,
  APIEvaluationSystemWithGradeConversions,
} from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'

describe('buildAPIEvaluationSystem', () => {
  it('should build APIEvaluationSystem correctly', async () => {
    const evaluationSystem: EvaluationSystem = {
      evaluationSystemID: '1',
      universityID: '2',
      universityName: 'Test University',
      evaluationSystemInfo: 'System A Info',
      URLToEvidence: 'System A evidence',
      evaluationType: EvaluationType.CONTINUOUS,
      validGrades: ['A', 'B', 'C'],
      evaluationSystemName: 'System A',
      fixed: 0,
    }

    const expected: APIEvaluationSystem = {
      evaluationsystemid: '1',
      universityid: '2',
      universityname: 'Test University',
      evaluationtype: EvaluationType.CONTINUOUS,
      validgrades: ['A', 'B', 'C'],
      evaluationsystemname: 'System A',
      evaluationsysteminfo: 'System A Info',
      urltoevidence: 'System A evidence',
      fixed: 0,
    }

    const result = await buildAPIEvaluationSystem(evaluationSystem)
    expect(result).toEqual(expected)
  })

  it('should throw an error if something goes wrong', async () => {
    const evaluationSystem = null

    await expect(buildAPIEvaluationSystem(evaluationSystem)).rejects.toThrow(Error)
  })
})

describe('buildAPIEvaluationSystemWithGradeConversions', () => {
  it('should build APIEvaluationSystemWithGradeConversions correctly', async () => {
    const evaluationSystemWithGradeConversions: EvaluationSystemWithGradeConversions = {
      evaluationSystemID: '1',
      universityID: '2',
      universityName: 'Test University',
      evaluationType: EvaluationType.CONTINUOUS,
      validGrades: ['A', 'B', 'C'],
      evaluationSystemName: 'System A',
      evaluationSystemInfo: 'System A Info',
      URLToEvidence: 'System A Evidence',
      fixed: 0,
      gradeConversions: [
        {
          gradeConversionID: 'gc1',
          evaluationSystemID: '1',
          MinIntervalGrade: 0,
          MaxIntervalGrade: 10,
          gradeValue: 'A',
          gradeName: 'Excellent',
          europeanEquivalence: EuropeanEquivalence.A,
        },
      ],
    }

    const expected: APIEvaluationSystemWithGradeConversions = {
      evaluationsystemid: '1',
      universityid: '2',
      universityname: 'Test University',
      evaluationtype: EvaluationType.CONTINUOUS,
      validgrades: ['A', 'B', 'C'],
      evaluationsystemname: 'System A',
      evaluationsysteminfo: 'System A Info',
      urltoevidence: 'System A Evidence',
      fixed: 0,
      gradeconversions: [
        {
          gradeconversionid: 'gc1',
          evaluationsystemid: '1',
          minintervalgrade: 0,
          maxintervalgrade: 10,
          gradevalue: 'A',
          gradename: 'Excellent',
          europeanequivalence: EuropeanEquivalence.A,
        },
      ],
    }

    const result = await buildAPIEvaluationSystemWithGradeConversions(
      evaluationSystemWithGradeConversions,
    )
    expect(result).toEqual(expected)
  })

  it('should throw an error if something goes wrong', async () => {
    const evaluationSystemWithGradeConversions = null

    await expect(
      buildAPIEvaluationSystemWithGradeConversions(evaluationSystemWithGradeConversions),
    ).rejects.toThrow(Error)
  })
})

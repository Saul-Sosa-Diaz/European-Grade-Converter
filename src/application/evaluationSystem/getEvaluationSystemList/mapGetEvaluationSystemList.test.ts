/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildEvaluationSystemListMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping APIEvaluationSystem to EvaluationSystem correctly,
 * handling empty input arrays, and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildEvaluationSystemListMap function.
 * @author Saul Sosa
 */

import { buildEvaluationSystemListMap } from './mapGetEvaluationSystemList'
import { APIEvaluationSystem } from '@/domain/evaluationSystem/dto/ApiEvaluationSystem'
import { EvaluationSystem, EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'

describe('buildEvaluationSystemListMap', () => {
  it('should map APIEvaluationSystem to EvaluationSystem correctly', async () => {
    const apiEvaluationSystems: APIEvaluationSystem[] = [
      {
        evaluationsystemid: '1',
        universityid: 'uni1',
        universityname: 'University 1',
        evaluationtype: EvaluationType.CONTINUOUS,
        evaluationsysteminfo: 'info1',
        urltoevidence: 'http://example.com/evidence1',
        validgrades: ['A', 'B', 'C'],
        evaluationsystemname: 'System 1',
        fixed: 2,
      },
      {
        evaluationsystemid: '2',
        universityid: 'uni2',
        universityname: 'University 2',
        evaluationtype: EvaluationType.CONTINUOUS,
        evaluationsysteminfo: 'info2',
        urltoevidence: 'http://example.com/evidence2',
        validgrades: ['D', 'E', 'F'],
        evaluationsystemname: 'System 2',
        fixed: 2,
      },
    ]

    const expectedEvaluationSystems: EvaluationSystem[] = [
      {
        evaluationSystemID: '1',
        universityID: 'uni1',
        universityName: 'University 1',
        evaluationType: EvaluationType.CONTINUOUS,
        evaluationSystemInfo: 'info1',
        URLToEvidence: 'http://example.com/evidence1',
        validGrades: ['A', 'B', 'C'],
        evaluationSystemName: 'System 1',
        fixed: 2,
      },
      {
        evaluationSystemID: '2',
        universityID: 'uni2',
        universityName: 'University 2',
        evaluationType: EvaluationType.CONTINUOUS,
        evaluationSystemInfo: 'info2',
        URLToEvidence: 'http://example.com/evidence2',
        validGrades: ['D', 'E', 'F'],
        evaluationSystemName: 'System 2',
        fixed: 2,
      },
    ]

    const result = await buildEvaluationSystemListMap(apiEvaluationSystems)
    expect(result).toEqual(expectedEvaluationSystems)
  })

  it('should handle empty input array', async () => {
    const apiEvaluationSystems: APIEvaluationSystem[] = []
    const expectedEvaluationSystems: EvaluationSystem[] = []

    const result = await buildEvaluationSystemListMap(apiEvaluationSystems)
    expect(result).toEqual(expectedEvaluationSystems)
  })

  it('should throw an error if mapping fails', async () => {
    const apiEvaluationSystems = null

    await expect(buildEvaluationSystemListMap(apiEvaluationSystems)).rejects.toThrow(Error)
  })
})

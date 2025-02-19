/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the utility functions used in the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the utility functions used in the EvaluationSystemForm component in the admin screen.
 * @author Saul Sosa
 */

import { InputType } from './ConstantsEvaluationSystemFom'
import {
  getMaxGrade,
  getMinGrade,
  getStep,
  createInitialFormValues,
  getGradeConversions,
  handleSubmit,
} from './UtilsEvaluationSystemForm'
import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem'

describe('utils', () => {
  describe('getMaxGrade', () => {
    it('should return the maximum valid grade', () => {
      const validGrades = ['1', '2', '3', '4', '5']
      expect(getMaxGrade(validGrades)).toBe(5)
    })

    it('should return the last element if no valid grade is found', () => {
      const validGrades = ['a', 'b', 'c']
      expect(getMaxGrade(validGrades)).toBe('c')
    })
  })

  describe('getMinGrade', () => {
    it('should return the minimum valid grade', () => {
      const validGrades = ['1', '2', '3', '4', '5']
      expect(getMinGrade(validGrades)).toBe(1)
    })

    it('should return the first element if no valid grade is found', () => {
      const validGrades = ['a', 'b', 'c']
      expect(getMinGrade(validGrades)).toBe('a')
    })
  })

  describe('getStep', () => {
    it('should return the correct step based on fixed value', () => {
      expect(getStep(2)).toBe(0.01)
      expect(getStep(3)).toBe(0.001)
    })
  })

  describe('createInitialFormValues', () => {
    it('should create initial form values for DISCRETE evaluation type', () => {
      const initialValues = {
        evaluationType: EvaluationType.DISCRETE,
        validGrades: ['1', '2', '3'],
      }
      const gradeConversionFromBack = [{ gradeValue: 'A' }]
      const result = createInitialFormValues({ initialValues, gradeConversionFromBack })
      expect(result).toEqual({
        ...initialValues,
        gradeEquivalence: gradeConversionFromBack,
      })
    })

    it('should create initial form values for INTERVAL evaluation type', () => {
      const initialValues = {
        evaluationType: EvaluationType.DISCRETE,
        validGrades: ['1', '2', '3'],
      }
      const gradeConversionFromBack = [{ gradeValue: 'A' }]
      const result = createInitialFormValues({ initialValues, gradeConversionFromBack })
      expect(result).toEqual({
        ...initialValues,
        gradeEquivalence: gradeConversionFromBack,
      })
    })
  })

  describe('getGradeConversions', () => {
    it('should return grade conversions with correct input type', () => {
      const getGradeConversionListByEvaluationID = [
        {
          europeanEquivalence: 'A',
          gradeValue: '1',
          MinIntervalGrade: null,
          MaxIntervalGrade: null,
        },
        { europeanEquivalence: 'B', gradeValue: '', MinIntervalGrade: 1, MaxIntervalGrade: 2 },
      ]
      const result = getGradeConversions({ getGradeConversionListByEvaluationID })
      expect(result).toEqual([
        { ...getGradeConversionListByEvaluationID[0], inputType: InputType.DISCRETE },
        { ...getGradeConversionListByEvaluationID[1], inputType: InputType.INTERVAL },
      ])
    })
  })

  describe('handleSubmit', () => {
    it('should handle submit for DISCRETE evaluation type', () => {
      const updatedEvaluationSystem = {
        evaluationType: EvaluationType.DISCRETE,
        gradeEquivalence: [{ gradeValue: 'A' }],
        evaluationSystemID: 1,
        evaluationSystemName: 'Test',
        fixed: 2,
        evaluationSystemInfo: 'Info',
        URLToEvidence: 'http://example.com',
        universityName: 'Test University',
      }
      const universityList = [{ name: 'Test University', id: 1 }]
      const onSubmit = jest.fn()
      handleSubmit({ updatedEvaluationSystem, universityList, onSubmit })
      expect(onSubmit).toHaveBeenCalledWith({
        validGrades: ['A'],
        evaluationSystemID: 1,
        evaluationSystemName: 'Test',
        evaluationType: EvaluationType.DISCRETE,
        fixed: 2,
        evaluationSystemInfo: 'Info',
        URLToEvidence: 'http://example.com',
        universityID: 1,
        universityName: 'Test University',
        gradeConversions: [
          {
            gradeConversionID: undefined,
            evaluationSystemID: undefined,
            europeanEquivalence: undefined,
            gradeName: undefined,
            MinIntervalGrade: null,
            MaxIntervalGrade: null,
            gradeValue: 'A',
          },
        ],
      })
    })
  })
})

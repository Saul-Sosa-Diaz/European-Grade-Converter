/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the continuousGradeConvert and discreteGradeConvert functions.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as converting numeric and special grades to Spanish equivalents.
 *
 * @date February 18, 2025
 * @description This file has the tests for the continuousGradeConvert and discreteGradeConvert functions.
 * @author Saul Sosa
 */

import { continuousGradeConvert, discreteGradeConvert, ConverterDirection } from './converter'
import { APIGradeConversion } from '../evaluationSystem/dto/ApiEvaluationSystem'
import { EuropeanEquivalence } from '../evaluationSystem/evaluationSystem'
import { buildContinuousGradeConvert } from '@/application/converter/buildGradeConvertParams'

describe('continuousGradeConvert', () => {
  it('should convert a numeric grade to Spanish equivalent', async () => {
    const conversion: APIGradeConversion = {
      minintervalgrade: 0,
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      maxintervalgrade: 100,
      gradeconversionid: '1',
      europeanequivalence: EuropeanEquivalence.A,
      evaluationsystemid: 'system1',
    }
    const grade = '50'
    const direction = ConverterDirection.toSpain
    const params = buildContinuousGradeConvert({ gradeConversions: conversion, grade, direction })
    const result = await continuousGradeConvert(params)
    expect(result).toBe(7.5)
  })

  it('should convert a special grade using discteteGradeConvert', async () => {
    const conversion = {
      minintervalgrade: 0,
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      maxintervalgrade: 100,
      gradevalue: 'A',
    }
    const grade = '30L'
    const direction = ConverterDirection.toSpain
    const result = await continuousGradeConvert({ conversion, grade, direction })
    expect(result).toBe(10)
  })
})

describe('discteteGradeConvert', () => {
  it('should convert a special grade to Spanish equivalent', async () => {
    const conversion = {
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      gradevalue: 'A',
    }
    const specialGrade = true
    const direction = ConverterDirection.toSpain
    const result = await discreteGradeConvert({ conversion, specialGrade, direction })
    expect(result).toBe(10)
  })

  it('should convert a special grade to original grade value', async () => {
    const conversion = {
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      gradevalue: 'A',
    }
    const specialGrade = true
    const result = await discreteGradeConvert({ conversion, specialGrade })
    expect(result).toBe('A')
  })

  it('should convert a normal grade to Spanish equivalent', async () => {
    const conversion = {
      baseequivalentspanishgrade: 9,
      topequivalentspanishgrade: 10,
      gradevalue: 'B',
    }
    const specialGrade = false
    const direction = ConverterDirection.toSpain
    const result = await discreteGradeConvert({ conversion, specialGrade, direction })
    expect(result).toBe(9.5)
  })

  it('should convert a normal grade to original grade value', async () => {
    const conversion = {
      baseequivalentspanishgrade: 5,
      topequivalentspanishgrade: 10,
      gradevalue: 'B',
    }
    const specialGrade = false
    const result = await discreteGradeConvert({ conversion, specialGrade })
    expect(result).toBe('B')
  })
})

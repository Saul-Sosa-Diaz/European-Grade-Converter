/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the continuousGradeConvert and discreteGradeConvert functions.
 * It provides functionality to convert numeric and special grades to Spanish equivalents.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the continuousGradeConvert and discreteGradeConvert functions.
 * @author Saul Sosa
 */

export enum ConverterDirection {
  toSpain = 'toSpain',
}

export type ContinuousGradeConvertParams = {
  conversion: {
    minintervalgrade: number
    baseequivalentspanishgrade: number
    topequivalentspanishgrade: number
    maxintervalgrade: number
  }
  grade: string
  direction?: ConverterDirection
}

export type DiscreteGradeConvertParams = {
  conversion: {
    baseequivalentspanishgrade: number
    topequivalentspanishgrade: number
    gradevalue: string
  }
  specialGrade?: boolean
  direction?: ConverterDirection
}

/**
 * Converts a grade from one grading system to another, handling both continuous and special grades.
 *
 * @param {ContinuousGradeConvertParams} params - The parameters for the grade conversion.
 * @param {Conversion} params.conversion - The conversion details including base and top equivalent Spanish grades and interval grades.
 * @param {string | number} params.grade - The grade to be converted. Can be a number or a special grade string.
 * @param {ConverterDirection} params.direction - The direction of the conversion, either to or from the Spanish grading system.
 * @returns {Promise<number | string>} - The converted grade. Returns a number for continuous grades or a string for special grades.
 */
export async function continuousGradeConvert({
  conversion,
  grade,
  direction,
}: ContinuousGradeConvertParams) {
  const gradeNumber = Number(grade)
  if (isNaN(gradeNumber)) {
    // if the grade is not a number, it means that is a special grade like 30L in Italy or Matricula de Honor in Spain
    const discreteGradeConvertParams: DiscreteGradeConvertParams = {
      conversion: {
        baseequivalentspanishgrade: conversion.baseequivalentspanishgrade,
        topequivalentspanishgrade: conversion.topequivalentspanishgrade,
        gradevalue: grade,
      },
      direction,
      specialGrade: true,
    }
    return discreteGradeConvert(discreteGradeConvertParams)
  }
  const minIntervalGrade = Number(conversion.minintervalgrade)
  const baseEquivalentSpanishGrade = Number(conversion.baseequivalentspanishgrade)
  const topEquivalentSpanishGrade = Number(conversion.topequivalentspanishgrade)
  const maxIntervalGrade = Number(conversion.maxintervalgrade)
  const convertedGrade =
    direction === ConverterDirection.toSpain
      ? ((gradeNumber - minIntervalGrade) / (maxIntervalGrade - minIntervalGrade)) *
          (topEquivalentSpanishGrade - baseEquivalentSpanishGrade) +
        baseEquivalentSpanishGrade
      : ((gradeNumber - baseEquivalentSpanishGrade) /
          (topEquivalentSpanishGrade - baseEquivalentSpanishGrade)) *
          (maxIntervalGrade - minIntervalGrade) +
        minIntervalGrade
  return convertedGrade
}

/**
 * Converts a discrete grade based on the provided conversion parameters.
 *
 * @param {DiscreteGradeConvertParams} params - The parameters for the grade conversion.
 * @param {Conversion} params.conversion - The conversion details including base and top equivalent Spanish grades and the grade value.
 * @param {boolean} [params.specialGrade=false] - Indicates if the grade is special and comes from continuous conversion (e.g., 30L in Italy, Matricula de Honor in Spain).
 * @param {ConverterDirection} params.direction - The direction of conversion, either to Spain or from Spain.
 * @returns {Promise<number>} The converted grade.
 */
export async function discreteGradeConvert({
  conversion,
  specialGrade = false,
  direction,
}: DiscreteGradeConvertParams) {
  const baseEquivalentSpanishGrade = Number(conversion.baseequivalentspanishgrade)
  const topEquivalentSpanishGrade = Number(conversion.topequivalentspanishgrade)
  const gradeValue = conversion.gradevalue
  if (specialGrade) {
    // special grade is a boolean that indicates if the grade is special and comes from the contiuous conversion. like in Italy with the 30L, or in Spain Matricula de Honor
    return direction === ConverterDirection.toSpain ? topEquivalentSpanishGrade : gradeValue
  }

  const convertedGrade =
    direction === ConverterDirection.toSpain
      ? (baseEquivalentSpanishGrade + topEquivalentSpanishGrade) / 2
      : gradeValue

  return convertedGrade
}

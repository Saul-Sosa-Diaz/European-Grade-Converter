/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the types and enums for evaluation system-related operations.
 * It defines the types for EvaluationSystem, GradeConversion, and EvaluationSystemWithGradeConversions.
 *
 * @date February 18, 2025
 * @description This file has the types and enums for evaluation system-related operations.
 * @author Saul Sosa
 */

export enum EvaluationType {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
}

export type EvaluationSystem = {
  evaluationSystemID: string | ''
  evaluationSystemName: string
  evaluationType: EvaluationType
  validGrades: string[]
  fixed: number
  evaluationSystemInfo: string
  URLToEvidence: string
  universityID: string
  universityName: string
}

export enum EuropeanEquivalence {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  FX = 'Fx',
  F = 'F',
}

export type GradeConversion = {
  gradeConversionID: string | ''
  evaluationSystemID: string | ''
  europeanEquivalence: EuropeanEquivalence
  MinIntervalGrade?: number | ''
  MaxIntervalGrade?: number | ''
  gradeName?: string | ''
  gradeValue?: string | ''
}

export type EvaluationSystemWithGradeConversions = EvaluationSystem & {
  gradeConversions: GradeConversion[]
}

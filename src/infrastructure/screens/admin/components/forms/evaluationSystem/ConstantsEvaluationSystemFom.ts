/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains constants and enums used in the EvaluationSystemForm component.
 *
 * @date February 19, 2025
 * @description This file defines constants and enums for the EvaluationSystemForm component used in the admin screen.
 * @author Saul Sosa
 */

import { EuropeanEquivalence } from '@/domain/evaluationSystem/evaluationSystem'

export const europeanGrades: EuropeanEquivalence[] = [
  EuropeanEquivalence.F,
  EuropeanEquivalence.FX,
  EuropeanEquivalence.E,
  EuropeanEquivalence.D,
  EuropeanEquivalence.C,
  EuropeanEquivalence.B,
  EuropeanEquivalence.A,
]

export enum NamesFormInput {
  UNIVERSITY_NAME = 'universityName',
  EVALUATION_SYSTEM_NAME = 'evaluationSystemName',
  EVALUATION_TYPE = 'evaluationType',
  MIN_GRADE = 'minGrade',
  MAX_GRADE = 'maxGrade',
  FIXED = 'fixed',
  EVALUATION_SYSTEM_INFO = 'evaluationSystemInfo',
  URL_TO_EVIDENCE = 'URLToEvidence',
}

export enum InputType {
  INTERVAL = 'interval',
  DISCRETE = 'discrete',
}

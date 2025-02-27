/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the API data transfer objects (DTOs) for evaluation system-related operations.
 * It defines the types and interfaces for evaluation systems and grade conversions.
 *
 * @date February 18, 2025
 * @description This file has the API DTOs for evaluation system-related operations.
 * @author Saul Sosa
 */

import { EuropeanEquivalence, EvaluationType } from '../evaluationSystem'

export type APIGetEvaluationSystemList = APIEvaluationSystem[]
export interface APIEvaluationSystem {
  evaluationsystemid: string
  universityid: string
  universityname: string
  evaluationtype: EvaluationType
  evaluationsysteminfo: string
  urltoevidence: string
  validgrades: string[]
  evaluationsystemname: string
  fixed: number
}

export type APIEvaluationSystemWithGradeConversions = APIEvaluationSystem & {
  gradeconversions: APIGradeConversion[]
}

export type APIGradeConversion = {
  gradeconversionid: string
  evaluationsystemid: string
  europeanequivalence: EuropeanEquivalence
  baseequivalentspanishgrade?: number
  topequivalentspanishgrade?: number
  minintervalgrade?: number | ''
  maxintervalgrade?: number | ''
  gradename?: string
  gradevalue?: string
}

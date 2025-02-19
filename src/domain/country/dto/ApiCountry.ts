/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the API data transfer objects (DTOs) for country-related operations.
 * It defines the types and interfaces for country and country with evaluation information.
 *
 * @date February 18, 2025
 * @description This file has the API DTOs for country-related operations.
 * @author Saul Sosa
 */

export type APIGetCountryList = APICountry[]
export interface APICountry {
  countryid: string
  countrycode: string
  countryname: string
}

export type APIGetCountryWithEvaluationInfoList = APICountryWithEvaluationInfo[]

export enum APIEvaluationType {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
}
export interface APICountryWithEvaluationInfo {
  countryid: number
  countrycode: string
  countryname: string
  universityid: number
  universityname: string
  evaluationsystemname: string
  validgrades: string[]
  evaluationtype: APIEvaluationType
  evaluationsystemid: number
  fixed: number
  evaluationsysteminfo: string
  urltoevidence: string
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the types and functions for country-related operations.
 * It defines the types for Country and CountryWithEvaluationInfo and includes the findCountryByKey function.
 *
 * @date February 18, 2025
 * @description This file has the types and functions for country-related operations.
 * @author Saul Sosa
 */

import { EvaluationType } from '../evaluationSystem/evaluationSystem'

export type Country = {
  name: string
  code: string
  id: string
}

export type CountryWithEvaluationInfo = {
  label: string
  code?: string
  key: string
  selectable?: boolean
  fixed?: number
  validGrades?: string[]
  suffix?: string
  evaluationType?: EvaluationType
  evaluationSystemID?: string
  evaluationSystemInfo?: string
  children?: CountryWithEvaluationInfo[]
  document_url?: string
  urlToEvidence?: string
}

/**
 * Finds a country by its key from a list of countries.
 * 
 * @param key - The key of the country to find.
 * @param countries - The list of countries to search within.
 * @returns The country with the matching key, or undefined if not found.
 */
export function findCountryByKey(
  key: string,
  countries: CountryWithEvaluationInfo[],
): CountryWithEvaluationInfo | undefined {
  
  function searchCountry(
    country: CountryWithEvaluationInfo,
    key: string,
  ): CountryWithEvaluationInfo | undefined {
    if (country.key === key) {
      return country
    }
    if (country.children) {
      for (const child of country.children) {
        const result = searchCountry(child, key)
        if (result) {
          return result
        }
      }
    }
    return undefined
  }

  for (const country of countries) {
    const result = searchCountry(country, key)
    if (result) {
      return result
    }
  }

  return undefined
}

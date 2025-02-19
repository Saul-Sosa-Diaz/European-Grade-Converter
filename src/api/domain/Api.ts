/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file defines the Api interface which aggregates various repositories.
 * It includes repositories for country, university, evaluation system,
 * and grade conversion functionalities.
 *
 * @date February 18, 2025
 * @description This file defines the Api interface.
 * @author Saul Sosa
 */
import { ConverterRepository } from '@/domain/converter/converterRepository'
import { CountryRepository } from '@/domain/country/countryRepository'
import { EvaluationSystemRepository } from '@/domain/evaluationSystem/evaluationSystemRepository'
import { UniversityRepository } from '@/domain/university/universityRepository'

export interface Api {
  Country: CountryRepository
  University: UniversityRepository
  EvaluationSystem: EvaluationSystemRepository
  Converter: ConverterRepository
}

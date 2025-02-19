/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the createCountry function.
 * It uses the CountryRepository to create a new country.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the implementation for the createCountry function.
 * @author Saul Sosa
 */

import { CountryRepository, CreateCountry } from '@/domain/country/countryRepository'

export function createCountry(countryRepository: CountryRepository): CreateCountry.Request {
  return async (params: CreateCountry.Params) => {
    await countryRepository.createCountry(params)
  }
}

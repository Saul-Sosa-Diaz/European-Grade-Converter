/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the updateCountry function.
 * It uses the CountryRepository to update a country's information.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the updateCountry function.
 * @author Saul Sosa
 */
import { CountryRepository, UpdateCountry } from '@/domain/country/countryRepository'

export function updateCountry(countryRepository: CountryRepository): UpdateCountry.Request {
  return async (params: UpdateCountry.Params) => {
    await countryRepository.updateCountry(params)
  }
}

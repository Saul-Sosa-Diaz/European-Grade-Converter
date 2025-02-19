/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the deleteCountry function.
 * It uses the CountryRepository to delete a country.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the deleteCountry function.
 * @author Saul Sosa
 */

import { CountryRepository, DeleteCountry } from '@/domain/country/countryRepository'

export function deleteCountry(countryRepository: CountryRepository): DeleteCountry.Request {
  return async (params: DeleteCountry.Params) => {
    await countryRepository.deleteCountry(params)
  }
}

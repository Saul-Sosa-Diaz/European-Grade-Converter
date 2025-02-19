/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the getCountryList function.
 * It uses the CountryRepository to retrieve the list of countries.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the implementation for the getCountryList function.
 * @author Saul Sosa
 */
import { CountryRepository, GetCountryList } from '../../../domain/country/countryRepository'

export function getCountryList(countryRepository: CountryRepository): GetCountryList.Request {
  return async () => await countryRepository.getCountryList()
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the buildAPICountry function.
 * It converts a Country object to an APICountry object.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the buildAPICountry function.
 * @author Saul Sosa
 */
import { Country } from '@/domain/country/country'
import { APICountry } from '@/domain/country/dto/ApiCountry'

/**
 * Converts a `Country` object to an `APICountry` object.
 *
 * @param {Country} country - The country object to be converted.
 * @returns {Promise<APICountry>} A promise that resolves to the converted `APICountry` object.
 * @throws {Error} If an error occurs during the conversion process.
 */
export const buildAPICountry = async (country: Country): Promise<APICountry> => {
  try {
    const convertedCountry: APICountry = {
      countryid: country.id,
      countrycode: country.code,
      countryname: country.name,
    }
    return convertedCountry
  } catch (error) {
    throw new Error(error)
  }
}

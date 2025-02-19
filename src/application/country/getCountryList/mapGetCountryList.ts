/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the buildCountryListMap function.
 * It maps and sorts the country list retrieved from the API.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the implementation for the buildCountryListMap function.
 * @author Saul Sosa
 */
import { Country } from '@/domain/country/country'
import { APICountry } from '@/domain/country/dto/ApiCountry'

/**
 * Builds a list of countries from the provided API data transfer objects (DTOs).
 *
 * @param dto - An array of APICountry objects representing the country data from the API.
 * @returns A promise that resolves to an array of Country objects, sorted by country name.
 *
 * @throws Will throw an error if the mapping or sorting process fails.
 */
export const buildCountryListMap = async (dto: APICountry[]): Promise<Country[]> => {
  try {
    const countryList: Country[] = dto.map((country) => {
      return {
        id: country.countryid.toString(),
        name: country.countryname,
        code: country.countrycode,
      }
    })

    const sortedCountries = countryList.sort((a, b) => a.name.localeCompare(b.name))
    return sortedCountries
  } catch (error) {
    throw new Error(error)
  }
}

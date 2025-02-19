/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the buildUniversityListMap function.
 * It maps and sorts the university list retrieved from the API.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the buildUniversityListMap function.
 * @author Saul Sosa
 */

import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { University } from '@/domain/university/university'

/**
 * Builds a list of universities from the provided DTO and sorts them by country name.
 *
 * @param dto - An array of APIUniversity objects containing university data.
 * @returns A promise that resolves to an array of University objects sorted by country name.
 * @throws Will throw an error if the mapping or sorting process fails.
 */
export const buildUniversityListMap = async (dto: APIUniversity[]): Promise<University[]> => {
  try {
    const universityList = dto.map((university) => {
      return {
        name: university.universityname,
        country: university.countryname,
        countryID: university.countryid,
        id: university.universityid,
      }
    })

    const sortedUniversityList = universityList.sort((a, b) => a.country.localeCompare(b.country))
    return sortedUniversityList
  } catch (error) {
    throw new Error(error)
  }
}

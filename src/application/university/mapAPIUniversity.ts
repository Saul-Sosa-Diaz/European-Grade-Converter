/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the buildAPIUniversity function.
 * It converts a University object to an APIUniversity object.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the buildAPIUniversity function.
 * @author Saul Sosa
 */

import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { University } from '@/domain/university/university'

/**
 * Builds an APIUniversity object from a University object.
 *
 * @param {University} university - The university object to be converted.
 * @returns {Promise<APIUniversity>} A promise that resolves to the converted APIUniversity object.
 * @throws {Error} If the university object is null or an error occurs during conversion.
 */
export const buildAPIUniversity = async (university: University): Promise<APIUniversity> => {
  try {
    if (!university) {
      throw new Error('University is null')
    }
    const convertedUniversity: APIUniversity = {
      universityname: university.name,
      countryname: university.country,
      countryid: university.countryID,
      universityid: university.id,
    }
    return convertedUniversity
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of a fake CountryRepository.
 * It provides a mock implementation for managing countries.
 *
 * @date February 19, 2025
 * @description This file implements a fake CountryRepository for testing purposes.
 * @author Saul Sosa
 */

import { COUNTRY_LIST, COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED } from '../../fixture/countries'
import { CountryRepository } from '@/domain/country/countryRepository'

export function createCountryRepositoryFake(): CountryRepository {
  return {
    getCountryWithEvaluationInfoList: async () => COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED,
    getCountryList: async () => {
      return COUNTRY_LIST
    },
    updateCountry: async (country) => {
      console.log(country)
    },
    createCountry: async (country) => {
      console.log(country)
      return
    },
    deleteCountry: async (country) => {
      console.log(country)
      return
    },
  }
}

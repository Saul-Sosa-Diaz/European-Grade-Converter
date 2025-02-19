/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the getCountryWithEvaluationInfoList function.
 * It uses the CountryRepository to retrieve the list of countries with evaluation information.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the getCountryWithEvaluationInfoList function.
 * @author Saul Sosa
 */
import {
  CountryRepository,
  GetCountryWithEvaluationInfoList,
} from '../../../domain/country/countryRepository'

export function getCountryWithEvaluationInfoList(
  countryRepository: CountryRepository,
): GetCountryWithEvaluationInfoList.Request {
  return async () => await countryRepository.getCountryWithEvaluationInfoList()
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the ConverterRepository.
 * It defines the function to convert grades using an external API.
 *
 * @date February 19, 2025
 * @description This file implements the ConverterRepository for converting grades.
 * @version 1.0.0
 * @author Saul Sosa
 */

import { API_URL } from '@/constants/apiURL'
import { ConverterRepository, ConvertGrade } from '@/domain/converter/converterRepository'

export function createConverterRepository(): ConverterRepository {
  return {
    convertGrade: async (params: ConvertGrade.Params) => {
      const response = await fetch(API_URL.converter.convertGrade, {
        method: 'post',
        body: JSON.stringify({ ...params }),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
      return response.convertedGrade
    },
  }
}

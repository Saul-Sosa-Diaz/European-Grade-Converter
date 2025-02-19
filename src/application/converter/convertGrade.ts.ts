/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the convertGrade function.
 * It uses the ConverterRepository to perform grade conversion.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the convertGrade function.
 * @author Saul Sosa
 */
import { ConverterRepository, ConvertGrade } from '@/domain/converter/converterRepository'

export function convertGrade(converterRepository: ConverterRepository): ConvertGrade.Request {
  return async (params: ConvertGrade.Params) => await converterRepository.convertGrade(params)
}

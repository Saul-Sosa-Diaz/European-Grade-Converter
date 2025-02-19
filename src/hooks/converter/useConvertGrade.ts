/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file Custom hook to convert a grade from one evaluation system to another.
 * It uses the useApi and useQuery hooks to perform the conversion.
 *
 * @date February 18, 2025
 * @description This file has the custom hook for grade conversion.
 * @author Saul Sosa
 */

import { useApi } from '@/context/ApiContext'
import { ConvertGrade } from '@/domain/converter/converterRepository'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to convert a grade from one evaluation system to another.
 *
 * @param {ConvertGrade.Params | null} params - The parameters required for grade conversion.
 * @returns {Object} - An object containing the converted grade and other properties from the query.
 *
 * @property {any} convertedGrade - The converted grade data.
 * @property {Object} rest - Other properties returned by the query.
 *
 * @example
 * const { convertedGrade, isLoading, error } = useConvertGrade({
 *   fromEvaluationSystemID: 'system1',
 *   toEvaluationSystemID: 'system2',
 *   grade: 85
 * });
 */
export const useConvertGrade = (params: ConvertGrade.Params | null) => {
  const { Converter: Converter } = useApi()
  const isParamsValid = !!(
    params &&
    params.fromEvaluationSystemID &&
    params.toEvaluationSystemID &&
    params.grade
  )
  const { data, ...rest } = useQuery({
    queryKey: [
      'convert-grade',
      params.fromEvaluationSystemID,
      params.grade,
      params.toEvaluationSystemID,
      isParamsValid,
    ],
    queryFn: async () => {
      if (!isParamsValid) {
        return null
      }
      try {
        const response = await Converter.convertGrade(params)
        return response
      } catch (error) {
        throw new Error(error.message)
      }
    },

    enabled: isParamsValid,
  })

  return { convertedGrade: data, ...rest }
}

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the repository interface and types for the grade conversion functionality.
 * It defines the parameters and response types for converting grades between different evaluation systems.
 *
 * @date February 18, 2025
 * @description This file has the repository interface and types for the grade conversion functionality.
 * @author Saul Sosa
 */

import { EvaluationType } from '../evaluationSystem/evaluationSystem'

export namespace ConvertGrade {
  export type Params = {
    fromEvaluationSystemID: string
    toEvaluationSystemID: string
    fromEvaluationType: EvaluationType
    toEvaluationType: EvaluationType
    grade: string
    fixed: string
  }
  export type Response = string
  export type Request = (params: ConvertGrade.Params) => Promise<ConvertGrade.Response>
}

export interface ConverterRepository {
  convertGrade: ConvertGrade.Request
}

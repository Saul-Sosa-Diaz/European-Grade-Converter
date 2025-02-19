/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the repository interface and types for evaluation system-related operations.
 * It defines the parameters and response types for retrieving, updating, creating, and deleting evaluation systems.
 *
 * @date February 18, 2025
 * @description This file has the repository interface and types for evaluation system-related operations.
 * @author Saul Sosa
 */

import {
  EvaluationSystem,
  GradeConversion,
  EvaluationSystemWithGradeConversions,
} from './evaluationSystem'

export namespace GetEvaluationSystemList {
  export type Params = void
  export type Response = EvaluationSystem[]
  export type Request = (
    params: GetEvaluationSystemList.Params,
  ) => Promise<GetEvaluationSystemList.Response>
}

export namespace GetGradeConversionListByEvaluationID {
  export type Params = { evaluationSystemID: number }
  export type Response = GradeConversion[]
  export type Request = (
    params: GetGradeConversionListByEvaluationID.Params,
  ) => Promise<GetGradeConversionListByEvaluationID.Response>
}

export namespace UpdateEvaluationSystem {
  export type Params = EvaluationSystemWithGradeConversions
  export type Response = void
  export type Request = (
    params: UpdateEvaluationSystem.Params,
  ) => Promise<UpdateEvaluationSystem.Response>
}
export namespace CreateEvaluationSystem {
  export type Params = EvaluationSystemWithGradeConversions
  export type Response = void
  export type Request = (
    params: CreateEvaluationSystem.Params,
  ) => Promise<CreateEvaluationSystem.Response>
}

export namespace DeleteEvaluationSystem {
  export type Params = EvaluationSystem
  export type Response = void
  export type Request = (
    params: DeleteEvaluationSystem.Params,
  ) => Promise<DeleteEvaluationSystem.Response>
}

export interface EvaluationSystemRepository {
  getEvaluationSystemList: GetEvaluationSystemList.Request
  getGradeConversionListByEvaluationID: GetGradeConversionListByEvaluationID.Request
  updateEvaluationSystem: UpdateEvaluationSystem.Request
  createEvaluationSystem: CreateEvaluationSystem.Request
  deleteEvaluationSystem: DeleteEvaluationSystem.Request
}

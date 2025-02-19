/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the updateUniversity function.
 * It uses the UniversityRepository to update a university's information.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the updateUniversity function.
 * @author Saul Sosa
 */

import { UniversityRepository, UpdateUniversity } from '@/domain/university/universityRepository'

export function updateUniversity(
  universityRepository: UniversityRepository,
): UpdateUniversity.Request {
  return async (params: UpdateUniversity.Params) => {
    await universityRepository.updateUniversity(params)
  }
}

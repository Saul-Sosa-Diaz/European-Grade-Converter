/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the deleteUniversity function.
 * It uses the UniversityRepository to delete a university.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the deleteUniversity function.
 * @author Saul Sosa
 */

import { DeleteUniversity, UniversityRepository } from '@/domain/university/universityRepository'

export function deleteUniversity(
  universityRepository: UniversityRepository,
): DeleteUniversity.Request {
  return async (params: DeleteUniversity.Params) => {
    await universityRepository.deleteUniversity(params)
  }
}

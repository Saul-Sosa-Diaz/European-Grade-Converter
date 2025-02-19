/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the createUniversity function.
 * It uses the UniversityRepository to create a new university.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the createUniversity function.
 * @author Saul Sosa
 */

import { CreateUniversity, UniversityRepository } from '@/domain/university/universityRepository'

export function createUniversity(
  universityRepository: UniversityRepository,
): CreateUniversity.Request {
  return async (params: CreateUniversity.Params) => {
    await universityRepository.createUniversity(params)
  }
}

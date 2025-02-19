/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation for the getUniversityList function.
 * It uses the UniversityRepository to retrieve the list of universities.
 *
 * @date February 18, 2025
 * @description This file has the implementation for the getUniversityList function.
 * @author Saul Sosa
 */
import { GetUniversityList, UniversityRepository } from '@/domain/university/universityRepository'

export function getUniversityList(
  universityRepository: UniversityRepository,
): GetUniversityList.Request {
  return async () => await universityRepository.getUniversityList()
}

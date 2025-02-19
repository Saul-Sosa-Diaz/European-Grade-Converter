/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the UniversityRepository.
 * It defines functions to manage universities using an external API.
 *
 * @date February 19, 2025
 * @description This file implements the UniversityRepository for managing universities.
 * @author Saul Sosa
 */

import { buildUniversityListMap } from '@/application/university/getUniversityList/mapGetUniversityList'
import { buildAPIUniversity } from '@/application/university/mapAPIUniversity'
import { API_URL } from '@/constants/apiURL'
import { UniversityRepository } from '@/domain/university/universityRepository'

export function createUniversityRepository(): UniversityRepository {
  return {
    getUniversityList: async () => {
      const { universityList } = await fetch(API_URL.university.getUniversityList, {
        method: 'get',
      })
        .then((response) => response.json())
        .catch((error) => {
          throw new Error(error)
        })

      const mappedUniversityList = await buildUniversityListMap(universityList)
      return mappedUniversityList
    },
    updateUniversity: async (university) => {
      const mappedUniversity = await buildAPIUniversity(university)
      const response = await fetch(API_URL.university.updateUniversity, {
        method: 'put',
        body: JSON.stringify(mappedUniversity),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    createUniversity: async (university) => {
      const mappedUniversity = await buildAPIUniversity(university)
      const response = await fetch(API_URL.university.createUniversity, {
        method: 'post',
        body: JSON.stringify(mappedUniversity),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
    deleteUniversity: async (university) => {
      const mappedUniversity = await buildAPIUniversity(university)
      const response = await fetch(API_URL.university.deleteUniversity, {
        method: 'delete',
        body: JSON.stringify(mappedUniversity),
      }).then((response) => response.json())
      if (!response.success) {
        throw new Error(response.error)
      }
    },
  }
}

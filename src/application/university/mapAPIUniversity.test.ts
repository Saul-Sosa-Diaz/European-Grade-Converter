/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildAPIUniversity function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as converting University to APIUniversity correctly,
 * and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildAPIUniversity function.
 * @author Saul Sosa
 */

import { buildAPIUniversity } from './mapAPIUniversity'
import { University } from '@/domain/university/university'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'

describe('buildAPIUniversity', () => {
  it('should convert University to APIUniversity correctly', async () => {
    const university: University = {
      name: 'Test University',
      country: 'Test Country',
      countryID: 'TC',
      id: '1234',
    }

    const expectedAPIUniversity: APIUniversity = {
      universityname: 'Test University',
      countryname: 'Test Country',
      countryid: 'TC',
      universityid: '1234',
    }

    const result = await buildAPIUniversity(university)
    expect(result).toEqual(expectedAPIUniversity)
  })

  it('should throw an error if conversion fails', async () => {
    const university = null
    await expect(buildAPIUniversity(university)).rejects.toThrow(Error)
  })
})

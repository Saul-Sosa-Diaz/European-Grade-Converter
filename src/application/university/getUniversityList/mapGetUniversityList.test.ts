/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildUniversityListMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping and sorting the university list correctly,
 * handling empty input arrays, and error handling.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildUniversityListMap function.
 * @author Saul Sosa
 */

import { buildUniversityListMap } from './mapGetUniversityList'
import { APIUniversity } from '@/domain/university/dto/ApiUniversity'
import { University } from '@/domain/university/university'

describe('buildUniversityListMap', () => {
  it('should map and sort the university list correctly', async () => {
    const input: APIUniversity[] = [
      { universityname: 'University A', countryname: 'USA', countryid: '1', universityid: '101' },
      {
        universityname: 'University B',
        countryname: 'Canada',
        countryid: '2',
        universityid: '102',
      },
      { universityname: 'University C', countryname: 'USA', countryid: '1', universityid: '103' },
    ]

    const expectedOutput: University[] = [
      { name: 'University B', country: 'Canada', countryID: '2', id: '102' },
      { name: 'University A', country: 'USA', countryID: '1', id: '101' },
      { name: 'University C', country: 'USA', countryID: '1', id: '103' },
    ]

    const result = await buildUniversityListMap(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle an empty input array', async () => {
    const input: APIUniversity[] = []
    const expectedOutput: University[] = []

    const result = await buildUniversityListMap(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should throw an error if mapping fails', async () => {
    const input = null

    await expect(buildUniversityListMap(input)).rejects.toThrow(Error)
  })
})

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the findCountryByKey function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as finding countries by key at various nested levels and handling cases where the key is not found.
 *
 * @date February 18, 2025
 * @description This file has the tests for the findCountryByKey function.
 * @author Saul Sosa
 */

import { findCountryByKey, CountryWithEvaluationInfo } from './country'

describe('findCountryByKey', () => {
  const countries: CountryWithEvaluationInfo[] = [
    {
      label: 'Country A',
      key: 'A',
      children: [
        {
          label: 'Country A1',
          key: 'A1',
        },
        {
          label: 'Country A2',
          key: 'A2',
          children: [
            {
              label: 'Country A21',
              key: 'A21',
            },
          ],
        },
      ],
    },
    {
      label: 'Country B',
      key: 'B',
    },
  ]

  it('should find a country by key at the root level', () => {
    const result = findCountryByKey('B', countries)
    expect(result).toEqual({ label: 'Country B', key: 'B' })
  })

  it('should find a country by key at a nested level', () => {
    const result = findCountryByKey('A1', countries)
    expect(result).toEqual({ label: 'Country A1', key: 'A1' })
  })

  it('should find a country by key at a deeper nested level', () => {
    const result = findCountryByKey('A21', countries)
    expect(result).toEqual({ label: 'Country A21', key: 'A21' })
  })

  it('should return undefined if the key is not found', () => {
    const result = findCountryByKey('C', countries)
    expect(result).toBeUndefined()
  })
})

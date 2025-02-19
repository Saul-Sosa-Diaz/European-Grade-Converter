/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildAPICountry function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as converting Country to APICountry correctly.
 *
 * @version 1.0.0
 * @date February 18, 2025
 * @description This file has the tests for the buildAPICountry function.
 * @author Saul Sosa
 */

import { buildAPICountry } from './mapAPICountry'
import { Country } from '@/domain/country/country'
import { APICountry } from '@/domain/country/dto/ApiCountry'

describe('buildAPICountry', () => {
  it('should convert Country to APICountry correctly', async () => {
    const country: Country = {
      id: '1',
      code: 'US',
      name: 'United States',
    }

    const expectedAPICountry: APICountry = {
      countryid: '1',
      countrycode: 'US',
      countryname: 'United States',
    }

    const result = await buildAPICountry(country)
    expect(result).toEqual(expectedAPICountry)
  })
})

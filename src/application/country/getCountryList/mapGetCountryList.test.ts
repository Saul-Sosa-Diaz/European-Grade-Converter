/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the buildCountryListMap function.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as mapping and sorting the country list correctly.
 *
 * @date February 18, 2025
 * @description This file has the tests for the buildCountryListMap function.
 * @author Saul Sosa
 */
import { buildCountryListMap } from './mapGetCountryList'
import { APIGetCountryList } from '@/domain/country/dto/ApiCountry'
import { Country } from '@/domain/country/country'

describe('buildCountryListMap', () => {
  it('should map and sort the country list correctly', async () => {
    const dto: APIGetCountryList = [
      { countryid: '2', countryname: 'Brazil', countrycode: 'BR' },
      { countryid: '1', countryname: 'Argentina', countrycode: 'AR' },
      { countryid: '3', countryname: 'Canada', countrycode: 'CA' },
    ]

    const expected: Country[] = [
      { id: '1', name: 'Argentina', code: 'AR' },
      { id: '2', name: 'Brazil', code: 'BR' },
      { id: '3', name: 'Canada', code: 'CA' },
    ]

    const result = await buildCountryListMap(dto)
    expect(result).toEqual(expected)
  })

  it('should throw an error if mapping fails', async () => {
    const dto = null

    await expect(buildCountryListMap(dto)).rejects.toThrow(Error)
  })
})

/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Saul Sosa
 * @date February 18 2025
 *
 * @description This file constains the tests of api route to get a country list with evaluation info.
 */


import { API_COUNTRY_WITH_EVALUATION_INFO_LIST } from '@/infrastructure/fixture/countries';
import { GET } from './route';

jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: () => ({
    getDBCountryRepository: () => ({
      getCountryWithEvaluationInfoList: () => API_COUNTRY_WITH_EVALUATION_INFO_LIST,
    }),
  }),
}));

it('should return data with status 200', async () => {
  const response = await GET();
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body).toEqual({ countries: API_COUNTRY_WITH_EVALUATION_INFO_LIST });
  for (const country of body.countries) {
    expect(country).toBeDefined();
  }
});

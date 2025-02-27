/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the university-list API route.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as successful retrieval of the university list.
 *
 * @date February 18, 2025
 * @description This file has the tests for the route to get the university list.
 * @author Saul Sosa
 */
import { GET } from './route';
import { UNIVERSITY_LIST } from '@/infrastructure/fixture/university';


jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: () => ({
    getDBUniversityRepository: () => ({
      getUniversityList: () => UNIVERSITY_LIST,
    }),
  }),
}));

it('should return data with status 200', async () => {
  const response = await GET();
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body).toEqual({ universityList: UNIVERSITY_LIST });
});

/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the evaluation-system-list API route.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as successful retrieval of the evaluation system list.
 *
 * @date February 18, 2025
 * @description This file has the tests for the route to get the evaluation system list.
 * @author Saul Sosa
 */
import { GET } from './route';
import { EVALUATION_SYSTEM_LIST } from '@/infrastructure/fixture/evaluationSystem';

jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: () => ({
    getDBEvaluationSystemRepository: () => ({
      getEvaluationSystemList: () => EVALUATION_SYSTEM_LIST,
    }),
  }),
}));

it('should return data with status 200', async () => {
  const response = await GET();
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body).toEqual({ evaluationSystemList: EVALUATION_SYSTEM_LIST });
});

/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the grade-conversion-by-evaluation-system API route.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as successful retrieval of grade conversions by evaluation system ID.
 *
 * @date February 18, 2025
 * @description This file has the tests for the route to get grade conversions by evaluation system ID.
 * @author Saul Sosa
 */
import { SPAIN_GRADE_CONVERSIONS } from '@/infrastructure/fixture/evaluationSystem';
import { POST } from './route';

jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: () => ({
    getDBEvaluationSystemRepository: () => ({
      getGradeConversionListByEvaluationID: () => SPAIN_GRADE_CONVERSIONS,
    }),
  }),
}));

it('should return data with status 200', async () => {
  const request = {
    json: async () => ({ evaluationSystemID: 1 }),
    headers: new Headers(),
    method: 'POST',
    url: '',
    clone: jest.fn(),
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
  } as unknown as Request;
  const response = await POST(request);
  const body = await response.json();
  expect(response.status).toBe(200);
  expect(body).toEqual({ continuousGradeConversionListByEvaluationID: SPAIN_GRADE_CONVERSIONS });
});

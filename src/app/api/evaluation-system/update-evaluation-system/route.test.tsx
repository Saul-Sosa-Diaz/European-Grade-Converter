/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the update-evaluation-system API route.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as unauthorized access, error handling,
 * and successful evaluation system updates with user activity logging.
 *
 * @date February 18, 2025
 * @description This file has the tests for the route to update an evaluation system.
 * @author Saul Sosa
 */
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";
import { PUT as updateEvaluationSystemPUT } from "./route";

jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: jest.fn()
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn()
}));

describe('PUT /update-EvaluationSystem', () => {
  let databaseAdapterMock;
  let request;
  beforeEach(() => {
    databaseAdapterMock = {
      getDBEvaluationSystemRepository: jest.fn().mockReturnValue({
        updateEvaluationSystem: jest.fn()
      }),
      getdbAuthRepository: jest.fn().mockReturnValue({
        logUserActivity: jest.fn()
      })
    };
    request = {
      json: jest.fn().mockResolvedValue({}),
      headers: new Headers(),
      method: 'PUT',
      url: '',
      clone: jest.fn(),
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Request;
    (createDatabaseAdapter as jest.Mock).mockReturnValue(databaseAdapterMock);
  });

  it('should return 401 if session is not found', async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);
    const response = await updateEvaluationSystemPUT(request);
    const result = await response.json();
    expect(response.status).toBe(401);
    expect(result.message).toBe('Unauthorized');
  });

  it('should return 500 if an error occurs', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
    request.json = jest.fn().mockRejectedValue(new Error('Test error'));
    const response = await updateEvaluationSystemPUT(request);
    const result = await response.json();
    expect(response.status).toBe(500);
    expect(result.error).toBe('Test error');
    expect(result.success).toBe(false);
  });

  it('should update Evaluation System and log user activity', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
    request.json = jest.fn().mockResolvedValue({
      evaluationsystemid: null,
      universityid: 1,
      urltoevidence: 'https://youtu.be/x9wJoi8vLVE?si=OYAKywB6G5j8RGYp',
      evaluationsysteminfo: 'Enter a number',
      universityname: 'Universidad de La Laguna',
      evaluationtype: 'continuous',
      validgrades: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      evaluationsystemname: 'TestSystem',
      fixed: 0,
      gradeconversions: [
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 0,
          maxintervalgrade: 5,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'F'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: '',
          maxintervalgrade: '',
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'Fx'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 5,
          maxintervalgrade: 6,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'E'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 6,
          maxintervalgrade: 7,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'D'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 7,
          maxintervalgrade: 8,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'C'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 8,
          maxintervalgrade: 9,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'B'
        },
        {
          gradeconversionid: '',
          evaluationsystemid: null,
          minintervalgrade: 9,
          maxintervalgrade: 10,
          gradevalue: null,
          gradename: '',
          europeanequivalence: 'A'
        }
      ]
    });
    const response = await updateEvaluationSystemPUT(request);
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(databaseAdapterMock.getDBEvaluationSystemRepository().updateEvaluationSystem).toHaveBeenCalledWith(
      {
        evaluationsystemid: null,
        universityid: 1,
        urltoevidence: 'https://youtu.be/x9wJoi8vLVE?si=OYAKywB6G5j8RGYp',
        evaluationsysteminfo: 'Enter a number',
        universityname: 'Universidad de La Laguna',
        evaluationtype: 'continuous',
        validgrades: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        evaluationsystemname: 'TestSystem',
        fixed: 0,
        gradeconversions: [
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 0,
            maxintervalgrade: 5,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'F'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: '',
            maxintervalgrade: '',
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'Fx'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 5,
            maxintervalgrade: 6,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'E'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 6,
            maxintervalgrade: 7,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'D'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 7,
            maxintervalgrade: 8,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'C'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 8,
            maxintervalgrade: 9,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'B'
          },
          {
            gradeconversionid: '',
            evaluationsystemid: null,
            minintervalgrade: 9,
            maxintervalgrade: 10,
            gradevalue: null,
            gradename: '',
            europeanequivalence: 'A'
          }
        ]
      }
    );
    expect(databaseAdapterMock.getdbAuthRepository().logUserActivity).toHaveBeenCalledWith(
      'testUser',
      expect.any(Date),
      'Update Evaluation System'
    );
  });
});


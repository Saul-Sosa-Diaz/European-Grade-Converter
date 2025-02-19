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
 * @description This file contains the tests of route to convert a grade.
 */


import { EvaluationType } from '@/domain/evaluationSystem/evaluationSystem';
import { POST } from './route';
import { createDatabaseAdapter } from '@/infrastructure/config/databaseConfig';


jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: jest.fn()
}));

jest.mock('@/application/converter/buildGradeConvertParams', () => ({
  buildContinuousGradeConvert: jest.fn(),
  buildDiscreteGradeConvert: jest.fn()
}));

jest.mock('@/domain/converter/converter', () => ({
  continuousGradeConvert: jest.fn().mockResolvedValue(7.5),
  discreteGradeConvert: jest.fn().mockResolvedValue(9),
  ConverterDirection: {
    toSpain: 'toSpain'
  }
}));


describe('POST /convert-grade', () => {
  let databaseAdapterMock;
  let request;
  beforeEach(() => {
    databaseAdapterMock = {
      getDBConverterRepository: jest.fn().mockReturnValue({
        getGradeConversions: jest.fn()
      })
    };
    request = {
      json: jest.fn().mockResolvedValue({}),
      headers: new Headers(),
      method: 'POST',
      url: '',
      clone: jest.fn(),
      text: jest.fn(),
      arrayBuffer: jest.fn(),
      blob: jest.fn(),
      formData: jest.fn(),
    } as unknown as Request;
    (createDatabaseAdapter as jest.Mock).mockReturnValue(databaseAdapterMock);

  });

  it('should return 400 if required fields are missing', async () => {
    request.json = jest.fn().mockResolvedValue({});
    const response = await POST(request);
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.message).toBe('Missing required fields');
  });

  it('should return 500 if an error occurs', async () => {
    request.json = jest.fn().mockRejectedValue(new Error('Test error'))
    let response
    try {
      response = await POST(request);
    }
    catch (error) {
      expect(response.status).toBe(500);
      expect(error.message).toBe('Test error');
    }
  });

  it('should convert discrete grade correctly', async () => {

    request.json = jest.fn().mockResolvedValue({
      grade: 7,
      fromEvaluationSystemID: '2',
      toEvaluationSystemID: '3',
      fromEvaluationType: EvaluationType.DISCRETE,
      toEvaluationType: EvaluationType.DISCRETE
    })
    databaseAdapterMock.getDBConverterRepository().getGradeConversions
      .mockResolvedValueOnce([{ grade: 7, convertedGrade: 9 }]);

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.convertedGrade).toBe(9);
  });

  it('should convert continuous grade correctly', async () => {
    request.json = jest.fn().mockResolvedValue({
      grade: 5.5,
      fromEvaluationSystemID: '1',
      toEvaluationSystemID: '2',
      fixed: 2,
      fromEvaluationType: EvaluationType.CONTINUOUS,
      toEvaluationType: EvaluationType.CONTINUOUS
    })


    databaseAdapterMock.getDBConverterRepository().getGradeConversions
      .mockResolvedValueOnce([{ grade: 5.5, convertedGrade: 7.5 }]);

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.convertedGrade).toBe('7.50');
  });
});
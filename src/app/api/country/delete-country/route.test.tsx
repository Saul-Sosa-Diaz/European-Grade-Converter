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
 * @description This file constains the tests of api route to delete a country.
 */


import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";
import { DELETE as deleteCountryDELETE } from "./route";

jest.mock('@/infrastructure/config/databaseConfig', () => ({
  createDatabaseAdapter: jest.fn()
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn()
}));

describe('DELETE /delete-country', () => {
  let databaseAdapterMock;
  let request;
  beforeEach(() => {
    databaseAdapterMock = {
      getDBCountryRepository: jest.fn().mockReturnValue({
        deleteCountry: jest.fn()
      }),
      getdbAuthRepository: jest.fn().mockReturnValue({
        logUserActivity: jest.fn()
      })
    };
    request = {
      json: jest.fn().mockResolvedValue({}),
      headers: new Headers(),
      method: 'DELETE',
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
    const response = await deleteCountryDELETE(request);
    const result = await response.json();
    expect(response.status).toBe(401);
    expect(result.message).toBe('Unauthorized');
  });

  it('should return 500 if an error occurs', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
    request.json = jest.fn().mockRejectedValue(new Error('Test error'));
    const response = await deleteCountryDELETE(request);
    const result = await response.json();
    expect(response.status).toBe(500);
    expect(result.error).toBe('Test error');
    expect(result.success).toBe(false);
  });

  it('should delete country and log user activity', async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
    request.json = jest.fn().mockResolvedValue({
      countryid: '1',
      countrycode: 'US',
      countryname: 'United States'
    });

    const response = await deleteCountryDELETE(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(databaseAdapterMock.getDBCountryRepository().deleteCountry).toHaveBeenCalledWith({
      countryid: '1',
      countrycode: 'US',
      countryname: 'United States'
    });
    expect(databaseAdapterMock.getdbAuthRepository().logUserActivity).toHaveBeenCalledWith(
      'testUser',
      expect.any(Date),
      'Delete Country'
    );
  });
});

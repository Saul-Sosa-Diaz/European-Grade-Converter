/**
 * @jest-environment node
 */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains unit tests for the delete-university API route.
 * It uses Jest as the testing framework and mocks necessary dependencies.
 * The tests cover scenarios such as unauthorized access, error handling,
 * and successful university deletion with user activity logging.
 *
 * @date February 18, 2025
 * @description This file has the tests for the route to delete a university.
 * @author Saul Sosa
 */
import { createDatabaseAdapter } from "@/infrastructure/config/databaseConfig";
import { getServerSession } from "next-auth";
import { DELETE as deleteUniversityDELETE } from "./route";

jest.mock('@/infrastructure/config/databaseConfig', () => ({
    createDatabaseAdapter: jest.fn()
}));

jest.mock('next-auth/next', () => ({
    getServerSession: jest.fn()
}));

describe('DELETE /delete-university', () => {
    let databaseAdapterMock;
    let request;
    beforeEach(() => {
        databaseAdapterMock = {
            getDBUniversityRepository: jest.fn().mockReturnValue({
                deleteUniversity: jest.fn()
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
        const response = await deleteUniversityDELETE(request);
        const result = await response.json();
        expect(response.status).toBe(401);
        expect(result.message).toBe('Unauthorized');
    });

    it('should return 500 if an error occurs', async () => {
        (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
        request.json = jest.fn().mockRejectedValue(new Error('Test error'));
        const response = await deleteUniversityDELETE(request);
        const result = await response.json();
        expect(response.status).toBe(500);
        expect(result.error).toBe('Test error');
        expect(result.success).toBe(false);
    });

    it('should delete university and log user activity', async () => {
        (getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'testUser' } });
        request.json = jest.fn().mockResolvedValue({
            universityname: 'New University',
            countryname: 'Austria',
            countryid: '8',
            universityid: '10'
        });

        const response = await deleteUniversityDELETE(request);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(databaseAdapterMock.getDBUniversityRepository().deleteUniversity).toHaveBeenCalledWith({
            universityname: 'New University',
            countryname: 'Austria',
            countryid: '8',
            universityid: '10'
        });
        expect(databaseAdapterMock.getdbAuthRepository().logUserActivity).toHaveBeenCalledWith(
            'testUser',
            expect.any(Date),
            'Delete University'
        );
    });
});


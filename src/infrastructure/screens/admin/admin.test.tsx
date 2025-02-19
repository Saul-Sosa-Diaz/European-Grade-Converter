/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the Admin screen.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the Admin screen component.
 * @author Saul Sosa
 */

import { Admin, AdminTabsNames } from './admin';
import { fireEvent, render, screen, waitFor } from '@/tests/app-test-utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

jest.mock('next-auth/react');
jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));


describe('Admin Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading spinner when session is loading', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });
        render(<Admin />);
        expect(screen.getByRole('progressbar')).toBeVisible();
    });

    it('redirects to /403 if session is not available', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
        render(<Admin />);
        expect(redirect).toHaveBeenCalledWith('/403');
    });

    it('renders Admin Page and tabs when session is available', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test User' }, role: 'admin' }, status: 'authenticated' });

        render(<Admin />);
        expect(screen.getByText('Admin Page')).toBeVisible();
        expect(screen.getByText('Dashboard')).toBeVisible();
        expect(screen.getByText(AdminTabsNames.COUNTRIES)).toBeVisible();
        expect(screen.getByText(AdminTabsNames.UNIVERSITIES)).toBeVisible();
        expect(screen.getByText(AdminTabsNames.EVALUATION_SYSTEM)).toBeVisible();
    });

    it('renders Dashboard component by default', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test User' }, role: 'admin' }, status: 'authenticated' });

        render(<Admin />);
        expect(screen.getByText('Dashboard')).toBeVisible();
    });

    it('changes active tab and renders corresponding component', async () => {
        (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test User' }, role: 'admin' }, status: 'authenticated' });
        render(<Admin />);
        fireEvent.click(screen.getByText(AdminTabsNames.COUNTRIES))
        await waitFor(() => {
            expect(screen.getByText(AdminTabsNames.UNIVERSITIES)).toBeVisible();
        });

        fireEvent.click(screen.getByText(AdminTabsNames.UNIVERSITIES))
        await waitFor(() => {
            expect(screen.getByText(AdminTabsNames.EVALUATION_SYSTEM)).toBeVisible();
        });

        fireEvent.click(screen.getByText(AdminTabsNames.EVALUATION_SYSTEM))
    });
});
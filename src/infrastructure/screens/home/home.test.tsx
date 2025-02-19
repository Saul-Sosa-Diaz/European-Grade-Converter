/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the unit tests for the home screen.
 *
 * @date February 19, 2025
 * @description This file defines the unit tests for the home screen used in the application.
 * @version 1.0.0
 * @author Saul Sosa
 */
import React from 'react';
import { render, screen } from '@/tests/app-test-utils';

import { Home } from './home';
import { useGetCountryWithEvaluationInfoList } from '@/hooks/country/useGetCountryWithEvaluationInfoList';
import { COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED } from '@/infrastructure/fixture/countries';

jest.mock('@/hooks/country/useGetCountryWithEvaluationInfoList');

jest.mock('primereact/progressspinner', () => ({
    ProgressSpinner: () => <div>Loading...</div>,
}));


describe('Home', () => {
    it('renders loading spinner when data is loading', () => {
        (useGetCountryWithEvaluationInfoList as jest.Mock).mockReturnValue({
            countryWithEvaluationInfoList: [],
            isLoading: true,
        });

        render(<Home />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the home screen components when data is loaded', () => {
        (useGetCountryWithEvaluationInfoList as jest.Mock).mockReturnValue({
            countryWithEvaluationInfoList: COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED,
            isLoading: false,
        });

        render(<Home />);
        expect(screen.getByText('Spain')).toBeInTheDocument();
        expect(screen.getByText('Select a Country')).toBeInTheDocument();
        expect(screen.getByText('University Grade Conversion')).toBeInTheDocument();
        expect(screen.getByText('alu0101404141@ull.edu.es')).toBeInTheDocument();
    });
});

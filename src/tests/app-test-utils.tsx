/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains utility functions for testing the application.
 *
 * @date February 19, 2025
 * @description This file defines utility functions for testing the application, including a custom render function that wraps components with necessary providers.
 * @author Saul Sosa
 */


import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createApi } from '@/api/createApi'
import { ApiContext } from '@/context/ApiContext'
import { queryClient } from './query-client'
import { GradeConverterContextProvider } from '@/context/GradeConverterContext'
import { COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED } from '@/infrastructure/fixture/countries'

const api = createApi({ offline: true })

export const render = (
    component: ReactElement,
) => {

    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <ApiContext.Provider value={api}>
                <GradeConverterContextProvider countries={COUNTRY_WITH_EVALUATION_INFO_LIST_MAPPED}>
                    {children}
                </GradeConverterContextProvider>
            </ApiContext.Provider>
        </QueryClientProvider>

    )

    return rtlRender(component, { wrapper: Wrapper })
}

// re-export everything
export * from '@testing-library/react'
export { api }
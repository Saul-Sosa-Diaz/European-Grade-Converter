/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the configuration for the QueryClient used in the application.
 *
 * @date February 19, 2025
 * @description This file defines the configuration for the QueryClient used in the application, including default options for queries.
 * @author Saul Sosa
 */

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
})
"use client";
import { QueryClient, QueryClientProvider as QueryClientProviderTanStanck } from "@tanstack/react-query";

export const QueryClientProvider = ({ children }) => {
    return (<QueryClientProviderTanStanck
        client={
            new QueryClient({
                defaultOptions: {
                    queries: {
                        gcTime: 1000 * 60 * 60 * 24,
                    },
                },
            })
        }
    >
        {children}
    </QueryClientProviderTanStanck>);
}
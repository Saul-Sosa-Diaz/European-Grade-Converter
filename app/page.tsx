"use client";
import { GradeConverterContextProvider } from "@/context/GradeConverterContext";
import { Home as HomeScreen } from "@/infrastructure/screens/home";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export default function App() {
  return (
    <QueryClientProvider
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
      <GradeConverterContextProvider>
        <HomeScreen />
      </GradeConverterContextProvider>
    </QueryClientProvider>

  );
}

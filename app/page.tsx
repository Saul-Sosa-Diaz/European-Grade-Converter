"use client";
import { Home as HomeScreen } from "@/infrastructure/screens/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <HomeScreen />

    </QueryClientProvider>
  );
}

"use client";
import { ApiProvider } from "@/src/context/ApiContext";
import { Home as HomeScreen } from "@/src/screens/home";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function App() {
  return (
    <ApiProvider>
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
    </ApiProvider>
  );
}

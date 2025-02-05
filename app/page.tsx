"use client";
import { Custom500 } from "@/infrastructure/screens/500/custom500";
import { Home as HomeScreen } from "@/infrastructure/screens/home";
import { ErrorBoundary } from "react-error-boundary";


export default function App() {

  return (
    <ErrorBoundary FallbackComponent={Custom500}>
      <HomeScreen />
    </ErrorBoundary>
  );
}

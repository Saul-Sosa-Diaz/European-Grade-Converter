/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the root layout component.
 * It sets up the global providers and error boundaries for the application.
 *
 * @date February 18, 2025
 * @description This file has the root layout component.
 * @author Saul Sosa
 */

import type { Metadata } from "next";
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { ApiProvider } from "@/context/ApiContext";
import LoadingStyles from "@/infrastructure/screens/components/LoadingStyles";
import { NextAuthProvider } from "@/context/nextAuthProvider/nextAuthProvider";
import { QueryClientProvider } from "@/infrastructure/screens/components/QueryClientProvider";
import { ErrorBoundary } from "react-error-boundary";
import { Custom500 } from "@/infrastructure/screens/500/custom500";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "University Grade Conversion tool",
  description: "University Grade Conversion tool",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <NextAuthProvider>
        <ApiProvider offline={false}>
          <QueryClientProvider>
            <ErrorBoundary FallbackComponent={Custom500}>
              <body className="m-0 overflow-visible">{<LoadingStyles>{children}</LoadingStyles>}</body>
              <Analytics />
            </ErrorBoundary>
          </QueryClientProvider>
        </ApiProvider>
      </NextAuthProvider>
    </html>
  );
}

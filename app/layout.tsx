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
            </ErrorBoundary>
          </QueryClientProvider>
        </ApiProvider>
      </NextAuthProvider>
    </html>
  );
}

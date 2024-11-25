import type { Metadata } from "next";
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { ApiProvider } from "@/context/ApiContext";
import LoadingStyles from "@/infrastructure/screens/components/LoadingStyles";
import { NextAuthProvider } from "@/context/nextAuthProvider/nextAuthProvider";

export const metadata: Metadata = {
  title: "University Grade Conversion tool",
  description: "University Grade Conversion tool",
  icons: {
    icon: "./favicon.ico", // public path
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
          <body className="m-0 overflow-visible">{<LoadingStyles>{children}</LoadingStyles>}</body>
        </ApiProvider>
      </NextAuthProvider>
    </html>
  );
}

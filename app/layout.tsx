import type { Metadata } from "next";
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { NextAuthProvider } from "@/context/nextAuthProvider/nextAuthProvider";
import { ApiProvider } from "@/context/ApiContext";

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
      <ApiProvider>
      <NextAuthProvider>
        <body className="m-0 overflow-visible">{children}</body>
      </NextAuthProvider>
      </ApiProvider>
    </html>
  );
}

import type { Metadata } from "next";
import "/node_modules/primeflex/primeflex.css";
import "@/src/app/styles/global-theme.css";
import "primeflex/primeflex.css";

export const metadata: Metadata = {
  title: "University Grade Conversion tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" m-0">{children}</body>
    </html>
  );
}

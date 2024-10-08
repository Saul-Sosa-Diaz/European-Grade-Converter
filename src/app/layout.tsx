import type { Metadata } from "next";
import "primereact/resources/themes/md-light-deeppurple/theme.css";

import "primeflex/primeflex.css";

export const metadata: Metadata = {
  title: "University Grade Conversion tool",
  description: "University Grade Conversion tool",
  icons: {
    icon: "/favicon.ico", // /public path
  },
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

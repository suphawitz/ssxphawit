import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { SiteHeader } from "@/components/site-header";

import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: "ssxphawit - Frontend Developer",
    template: "Suphawit",
  },
  description:
    "Portfolio of Suphawit Jaikaewma, a frontend developer building thoughtful, responsive digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { appConfig } from "@/config/app";

import "./globals.css";

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[var(--page-background)] font-sans text-slate-950 antialiased dark:text-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

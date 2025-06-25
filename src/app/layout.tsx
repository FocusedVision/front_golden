import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Golden Reputation",
    template: "%s | Golden Reputation",
  },
  description:
    "A modern, professional SaaS platform built with Next.js, Material UI, and Tailwind CSS",
  keywords: ["SaaS", "Dashboard", "Analytics", "Business", "Platform"],
  authors: [{ name: "Golden Reputation Team" }],
  creator: "Golden Reputation",
  publisher: "Golden Reputation",
  metadataBase: new URL("https://goldenreputation.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goldenreputation.com",
    title: "Golden Reputation - Professional SaaS Platform",
    description:
      "A modern, professional SaaS platform built with Next.js, Material UI, and Tailwind CSS",
    siteName: "Golden Reputation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Reputation - Professional SaaS Platform",
    description:
      "A modern, professional SaaS platform built with Next.js, Material UI, and Tailwind CSS",
    creator: "@goldenreputation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

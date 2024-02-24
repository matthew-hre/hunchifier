import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import { Suspense } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hunchifier",
  description: "Born out of a hatred for Miro",
  appleWebApp: {
    title: "Hunchifier",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="px-4">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen text-xl">
                  Loading...
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

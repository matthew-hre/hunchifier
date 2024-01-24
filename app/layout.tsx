import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";

// no vercel url needed yet

export const metadata: Metadata = {
  title: "Hunchifier",
  description: "Born out of a hatred for Miro",
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
          <main className="max-w-screen-sm mx-auto px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

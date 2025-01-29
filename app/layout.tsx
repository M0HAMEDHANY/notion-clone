import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "NotionX - Your Digital Workspace",
  description: "A powerful Notion clone for organizing your work and life",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200`}
        >
          <ThemeProvider>
            <div className="min-h-screen dark:bg-gray-900">
              <Header />
              <div className="flex min-h-[calc(100vh-4rem)]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {children}
                </div>
              </div>
              <Toaster position="top-center" />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

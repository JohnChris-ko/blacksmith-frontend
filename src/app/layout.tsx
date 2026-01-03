import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blacksmith AI",
  description: "Agent Chat UX by yohannes gebrekirstos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

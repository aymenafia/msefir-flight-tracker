import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthGate } from "@/components/auth/auth-gate";
import { AuthManager } from "@/components/auth-manager";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "msefir — Check your flight status easily",
  description: "msefir is a simple flight status tracker for travelers in the Maghreb region. Fast, clear, and stress-free flight information.",
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <LanguageProvider>
          <FirebaseClientProvider>
            <AuthManager />
            <AuthGate>
              {children}
            </AuthGate>
            <Toaster />
          </FirebaseClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FixitFlow - Interactive Electronics Repair Guides',
  description: 'Value Proposition: Provides structured, interactive, step-by-step guidance for complex electronics repair and modification, preventing mistakes and ensuring optimal performance for hobbyists and small repair businesses.

Target Customer: Electronics hobbyists, custom PC builders, independent electronics repair shops, and small IT service providers dealing with specialized hardware.

---
Category: Micro-SaaS
Target Market: Electronics hobbyists, custom PC builders, independent electronics repair shops, and small IT service providers dealing with specialized hardware.
Source Hypothesis ID: 0cffaa1f-2c47-42db-8ff4-026471534739
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">FixitFlow - Interactive Electronics Repair Guides</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

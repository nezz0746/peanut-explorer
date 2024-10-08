import "@peanut/ui/globals.css";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import RootProvider from "../providers/root";
import { Layout } from "../components/Layout";
import { Toaster } from "@peanut/ui/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peanut Explorer",
  description: "Expore the Peanut protocol deposits and withdrawals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="min-h-screen">
          <RootProvider>
            <Layout>
              {children}
              <Toaster />
            </Layout>
          </RootProvider>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/shared/Footer";
import MobileHeader from "@/components/shared/MobileHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Drive",
  description: "Manage your files easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <Header />
          <MobileHeader />
          {children}
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}

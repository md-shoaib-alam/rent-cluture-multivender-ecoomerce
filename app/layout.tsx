import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Providers } from "@/components/providers";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentSquare - Rent Fashion for Any Occasion",
  description: "Rent designer dresses, shoes, and accessories for weddings, parties, and special events. Save money with our rental service.",
  keywords: ["fashion rental", "dress rental", "wedding dress", "party dress", "designer rental"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
          <CookieConsent />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

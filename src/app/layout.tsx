import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/nav/nav";
import Footer from "./components/footer/footer";
import Script from "next/script";
import Link from "next/link";
import NavigationCentered from "./components/nav/nav-centered";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polar Lights Imaging",
  description: "Skyward bound",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background text-text">
      <body className={inter.className}>
        <NavigationCentered />
        {children}
        <Footer />
      </body>
    </html>
  );
}

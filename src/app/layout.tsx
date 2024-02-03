import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer/footer";
import NavigationCentered from "./components/nav/nav-centered";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polar Lights Imaging",
  description:
    "Explore top-tier aerial photography, 3D tours, and professional editing services by Polar Lights Imaging in Wisconsin and the Upper Peninsula. Elevate your visuals.",
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
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}

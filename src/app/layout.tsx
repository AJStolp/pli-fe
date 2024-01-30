import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer/footer";
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

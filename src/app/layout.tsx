import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import AwwwardsBackground from "@/components/AwwwardsBackground";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elev8solar | Powering the Future",
  description: "Premium, intelligent solar solutions for a cleaner tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased selection:bg-accent selection:text-black`}>
        <CustomCursor />
        <AwwwardsBackground />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

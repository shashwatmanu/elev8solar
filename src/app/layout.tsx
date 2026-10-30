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
  metadataBase: new URL("https://elev8solar.co"),
  title: "Elev8 Solar | India's Premier Solar EPC & Clean Energy Solutions",
  description: "Official Website of Elev8 Solar (elev8solar.co). Leading Engineering, Procurement & Construction (EPC) firm for commercial, utility-scale, and rooftop solar power plants across India.",
  keywords: [
    "Elev8 Solar",
    "elev8solar.co",
    "elev8 solar official",
    "solar EPC India",
    "commercial solar energy",
    "rooftop solar Delhi Gurgaon",
    "industrial solar plant installation",
    "solar EPC contractor"
  ],
  authors: [{ name: "Elev8 Solar" }],
  alternates: {
    canonical: "https://elev8solar.co",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Elev8 Solar | Powering the Future with Clean Energy",
    description: "Official Website (elev8solar.co) — High-performance commercial, utility & rooftop solar EPC systems delivering up to 90% power cost savings across India.",
    url: "https://elev8solar.co",
    siteName: "Elev8 Solar",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Elev8 Solar - Engineering, Procurement & Construction (EPC)",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elev8 Solar | Powering the Future",
    description: "Official Website (elev8solar.co) — Premier solar EPC solutions for commercial, industrial, and utility scale projects.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://elev8solar.co/#organization",
        "name": "Elev8 Solar",
        "url": "https://elev8solar.co",
        "logo": "https://elev8solar.co/logo.png",
        "image": "https://elev8solar.co/opengraph-image.png",
        "description": "Leading Engineering, Procurement & Construction (EPC) firm for commercial, utility, and residential solar projects.",
        "telephone": "+91-9560048386",
        "email": "elev8solar.in@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/company/elev8-solar/",
          "https://www.instagram.com/elev8solar.in/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://elev8solar.co/#website",
        "url": "https://elev8solar.co",
        "name": "Elev8 Solar",
        "publisher": { "@id": "https://elev8solar.co/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://elev8solar.co/projects?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

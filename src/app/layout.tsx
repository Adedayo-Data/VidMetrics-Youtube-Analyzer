import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "VidMetrics | YouTube Channel Analytics & Competitor Analysis",
  description: "Analyze any YouTube channel's performance metrics, engagement rates, and content strategy. Get instant insights into top-performing videos, audience growth, and competitive intelligence.",
  keywords: ["YouTube analytics", "channel audit", "competitor analysis", "video metrics", "engagement rate", "content strategy", "YouTube growth"],
  authors: [{ name: "VidMetrics" }],
  creator: "VidMetrics",
  publisher: "VidMetrics",
  robots: "index, follow",
  openGraph: {
    title: "VidMetrics | YouTube Channel Analytics & Competitor Analysis",
    description: "Analyze any YouTube channel's performance metrics, engagement rates, and content strategy. Get instant insights into top-performing videos.",
    url: "https://vidmetrics.app",
    siteName: "VidMetrics",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VidMetrics | YouTube Channel Analytics",
    description: "Analyze any YouTube channel's performance metrics and get competitive intelligence.",
    creator: "@vidmetrics",
  },
  alternates: {
    canonical: "https://vidmetrics.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <meta name="apple-mobile-web-app-title" content="VidMetrics" />
        <meta name="theme-color" content="#4f46e5" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      </head>
      <body className="min-h-full font-sans bg-white">{children}</body>
    </html>
  );
}

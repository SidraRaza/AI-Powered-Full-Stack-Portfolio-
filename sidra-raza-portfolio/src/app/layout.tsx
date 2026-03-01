import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/config/site";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Cursor } from "@/components/ui/cursor";
import { PersonSchema, WebsiteSchema } from "@/components/seo/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  /** ✅ REQUIRED FOR OG / TWITTER IMAGES */
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Sidra Raza – Full Stack & Agentic AI Developer",
    template: `%s | Sidra Raza`,
  },
  description: "AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows, increase efficiency, and drive scalable growth.",
  keywords: [
    "Sidra Raza",
    "AI Engineer",
    "Agentic AI Developer",
    "AI Automation",
    "Business Workflow Automation",
    "AI Systems Developer",
    "Next.js Developer",
    "Full Stack AI Developer",
    "AI Consultant",
    "LLM Integration",
    "AI Portfolio",
    "Machine Learning",
    "AI Solutions",
    "AI Freelancer Pakistan",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  authors: [{ name: "Sidra Raza", url: siteConfig.url }],
  creator: "Sidra Raza",
  publisher: "Sidra Raza",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Full Stack & Agentic AI Developer specializing in business workflow automation and scalable AI systems.",
    siteName: "Sidra Raza Portfolio",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Full Stack & Agentic AI Developer. I design and build intelligent AI systems that automate business workflows.",
    images: [siteConfig.ogImage],
    creator: "@sidraraza",
    site: "@sidraraza",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <PersonSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <MotionProvider>
          <Cursor enabled={true} />
          <Header />
          <main className="pt-20 sm:pt-24">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

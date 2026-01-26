import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/config/site";
import { MotionProvider } from "@/components/providers/MotionProvider";

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
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sidra Raza",
    "Sidra Raza portfolio",
    "Sidra Raza developer",
    "Sidra Raza Karachi Pakistan",
    "Sidra Pakistan",
    "AI Developer",
    "Agentic AI",
    "AI Automation",
    "AI Consultant",
    "LLM Integration",
    "AI Systems",
    "Business Automation",
    "AI Freelancer",
    "AI Portfolio",
    "Machine Learning",
    "AI Solutions",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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

  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sidra Raza",
    jobTitle: "AI Developer",
    description:
      "I build AI systems that run your business while you sleep. Agentic AI development for businesses ready to automate, scale, and dominate.",
    url: siteConfig.url,
    sameAs: [
      "https://linkedin.com/in/sidraraza",
      "https://github.com/SidraRaza",
    ],
    email: "mailto:sidraraza680@gmail.com",
    image: `${siteConfig.url}/logo/sidralogo.png`,
    knowsAbout: [
      "AI Development",
      "Agentic AI",
      "Machine Learning",
      "Business Automation",
      "LLM Integration",
    ],
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <MotionProvider>
          <Header />
          <main className="pt-20 sm:pt-24">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

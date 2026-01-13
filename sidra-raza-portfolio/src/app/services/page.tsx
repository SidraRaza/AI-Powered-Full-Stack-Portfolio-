import type { Metadata } from "next";
import { ServicesHero } from "./services-hero";
import { ServiceTiers } from "./service-tiers";
import { FAQ } from "./faq";
import { ServicesCTA } from "./services-cta";

export const metadata: Metadata = {
  title: "AI Services & Solutions - Sidra Raza | Strategy, Development & Implementation",
  description: "Comprehensive AI services from strategy sessions to full-scale builds. Expert in agentic AI development, business automation, and custom AI solutions tailored to your business needs.",
  keywords: [
    "AI Services",
    "AI Development",
    "Agentic AI",
    "Business Automation",
    "AI Strategy",
    "Custom AI Solutions",
    "AI Consulting",
    "Machine Learning",
    "AI Implementation",
    "AI for Business",
    "Sidra Raza Services"
  ],
  openGraph: {
    title: "AI Services & Solutions - Sidra Raza | Strategy, Development & Implementation",
    description: "Comprehensive AI services from strategy sessions to full-scale builds. Expert in agentic AI development, business automation, and custom AI solutions tailored to your business needs.",
    type: "website",
    url: "https://sidraraza.xyz/services",
    images: [
      {
        url: "/og/services.png",
        width: 1200,
        height: 630,
        alt: "AI Services by Sidra Raza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Services & Solutions - Sidra Raza | Strategy, Development & Implementation",
    description: "Comprehensive AI services from strategy sessions to full-scale builds. Expert in agentic AI development, business automation, and custom AI solutions tailored to your business needs.",
    images: ["/og/services.png"],
  },
  alternates: {
    canonical: "https://sidraraza.xyz/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceTiers />
      <FAQ />
      <ServicesCTA />
    </>
  );
}

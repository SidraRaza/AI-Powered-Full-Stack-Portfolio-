import type { Metadata } from "next";
import { AboutHero } from "./about-hero";
import { Philosophy } from "./philosophy";
import { Expertise } from "./expertise";
import { Personal } from "./personal";

export const metadata: Metadata = {
  title: "About Sidra Raza - AI Developer & Agentic AI Specialist",
  description: "Learn about Sidra Raza, an expert AI developer specializing in agentic AI systems. Discover my approach to building AI that automates business operations and drives growth.",
  keywords: [
    "About Sidra Raza",
    "AI Developer",
    "Agentic AI",
    "AI Specialist",
    "AI Portfolio",
    "Business Automation",
    "Machine Learning",
    "AI Consulting",
    "AI Solutions",
    "Sidra Raza Profile"
  ],
  openGraph: {
    title: "About Sidra Raza - AI Developer & Agentic AI Specialist",
    description: "Learn about Sidra Raza, an expert AI developer specializing in agentic AI systems. Discover my approach to building AI that automates business operations and drives growth.",
    type: "profile",
    url: "https://sidraraza.xyz/about",
    images: [
      {
        url: "/og/about.png",
        width: 1200,
        height: 630,
        alt: "About Sidra Raza - AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sidra Raza - AI Developer & Agentic AI Specialist",
    description: "Learn about Sidra Raza, an expert AI developer specializing in agentic AI systems. Discover my approach to building AI that automates business operations and drives growth.",
    images: ["/og/about.png"],
  },
  alternates: {
    canonical: "https://sidraraza.xyz/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Philosophy />
      <Expertise />
      <Personal />
    </>
  );
}

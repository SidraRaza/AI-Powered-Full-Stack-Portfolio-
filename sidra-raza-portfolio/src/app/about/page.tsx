import type { Metadata } from "next";
import { AboutHero } from "./about-hero";
import { Philosophy } from "./philosophy";
import { Expertise } from "./expertise";
import { Personal } from "./personal";

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Learn about Sidra Raza, a Full Stack & Agentic AI Developer from Pakistan specializing in AI automation and agentic systems. Discover my approach to building AI that runs your business while you sleep.",
  keywords: [
    "About Sidra Raza",
    "Agentic AI Developer from Pakistan",
    "Sidra Raza Karachi",
    "AI Automation Expert",
    "AI Systems Builder",
    "AI Developer",
    "Agentic AI",
    "AI Specialist",
    "AI Portfolio",
    "Business Automation",
    "Machine Learning",
    "AI Consulting",
    "AI Solutions",
    "AI Ops Studio",
    "Word Weaver AI Planner",
    "Agentic Systems",
    "AI for Business"
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Learn about Sidra Raza, a Full Stack & Agentic AI Developer from Pakistan specializing in AI automation and agentic systems.",
    type: "profile",
    url: "https://sidraraza.xyz/about",
    images: [
      {
        url: "/og/about.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Learn about Sidra Raza, a Full Stack & Agentic AI Developer from Pakistan specializing in AI automation and agentic systems.",
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

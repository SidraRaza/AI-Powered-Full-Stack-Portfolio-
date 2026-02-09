import { Hero, ProblemSolution, FeaturedAgents, ServicesOverview, Metrics, FinalCTA } from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sidra Raza – Full Stack Agentic AI Developer | AI Engineer | Next.js Specialist",

  description:
    "Sidra Raza is a Full Stack Agentic AI Developer & AI Engineer from Karachi, Pakistan. She builds scalable web applications, intelligent AI agents, and automation systems that help businesses operate smarter, faster, and 24/7.",

  keywords: [
    "Sidra Raza",
    "Sidra Raza Pakistan",
    "Sidra Raza Karachi",
    "Full Stack Agentic AI Developer",
    "Full Stack AI Developer Pakistan",
    "AI Engineer Pakistan",
    "Next.js Developer Pakistan",
    "Agentic AI Developer",
    "AI Automation Expert",
    "AI Systems Developer",
    "AI Portfolio",
    "Next.js TypeScript Developer",
    "AI SaaS Developer",
    "Intelligent Automation",
    "AI Ops Studio"
  ],

  openGraph: {
    title:
      "Sidra Raza – Full Stack Agentic AI Developer | Building AI Systems & Scalable Apps",
    description:
      "Full Stack Developer & AI Engineer specializing in Agentic AI systems, Next.js applications, and intelligent automation platforms for real-world production use.",
    type: "website",
    url: "https://sidraraza.xyz/",
    siteName: "Sidra Raza Portfolio",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack Agentic AI Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Sidra Raza – Full Stack Agentic AI Developer & AI Engineer",
    description:
      "Building scalable web apps, AI agents, and automation systems using Next.js, TypeScript, and modern full stack architecture.",
    images: ["/og/home.png"],
  },

  alternates: {
    canonical: "https://sidraraza.xyz/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <FeaturedAgents />
      <ServicesOverview />
      <Metrics />
      <FinalCTA />
    </>
  );
}

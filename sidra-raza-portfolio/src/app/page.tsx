import { Hero, ProblemSolution, FeaturedAgents, ServicesOverview, Metrics, FinalCTA } from "@/components/home";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Sidra Raza – Agentic AI Developer from Pakistan | AI Ops Studio & Intelligent Automation",
  description:
    "Sidra Raza is an Agentic AI Developer from Karachi, Pakistan. She builds intelligent AI systems that automate businesses, optimize operations, and run workflows 24/7. Founder of AI Ops Studio, specializing in agentic AI, AI automation, and scalable AI-powered solutions.",
  keywords: [
    "Sidra Raza",
    "Sidra Raza Pakistan",
    "Sidra Raza Karachi",
    "Agentic AI Developer",
    "Agentic AI Developer Pakistan",
    "AI Developer Pakistan",
    "AI Automation Expert",
    "AI Ops Studio",
    "Business Automation AI",
    "AI Systems Developer",
    "Intelligent Automation",
    "AI Portfolio",
    "AI Consultant Pakistan",
    "Famous Agentic AI Developer for Pakistan"
  ],

  openGraph: {
    title:
      "Sidra Raza – Agentic AI Developer from Pakistan | AI Systems That Run Businesses",
    description:
      "Sidra Raza is an Agentic AI Developer based in Karachi, Pakistan. She designs AI systems that automate, scale, and optimize businesses using intelligent agents and AI-driven workflows.",
    type: "website",
    url: "https://sidraraza.xyz/",
    siteName: "Sidra Raza – AI Ops Studio",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Agentic AI Developer from Pakistan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Sidra Raza – Agentic AI Developer from Pakistan | AI Ops Studio",
    description:
      "Agentic AI Developer from Karachi, Pakistan. Building AI systems that automate businesses and run operations while you sleep.",
    images: ["/og/home.png"],
  },

  alternates: {
    canonical: "https://sidraraza.xyz/",
  },
};


export default function Home() {
  return (
    <>
      {/* my main page */}
      <Hero />
      <ProblemSolution />
      <FeaturedAgents />
      <ServicesOverview />
      <Metrics />
      <FinalCTA />
    </>
  );
}

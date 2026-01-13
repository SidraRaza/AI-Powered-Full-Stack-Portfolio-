import { Hero, ProblemSolution, FeaturedAgents, ServicesOverview, Metrics, FinalCTA } from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidra Raza - AI Ops Studio | Building AI Systems That Run Your Business While You Sleep",
  description: "I build AI systems that run your business while you sleep. Agentic AI development for businesses ready to automate, scale, and dominate. Expert in AI automation, business optimization, and intelligent systems.",
  keywords: [
    "AI Developer",
    "Sidra Raza",
    "Agentic AI",
    "AI Automation",
    "Business Automation",
    "AI Systems",
    "AI Portfolio",
    "Machine Learning",
    "AI Solutions",
    "Intelligent Systems",
    "AI Consulting",
    "AI Development",
    "Business Intelligence"
  ],
  openGraph: {
    title: "Sidra Raza - AI Ops Studio | Building AI Systems That Run Your Business While You Sleep",
    description: "I build AI systems that run your business while you sleep. Agentic AI development for businesses ready to automate, scale, and dominate.",
    type: "website",
    url: "https://sidraraza.xyz/",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza - AI Ops Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza - AI Ops Studio | Building AI Systems That Run Your Business While You Sleep",
    description: "I build AI systems that run your business while you sleep. Agentic AI development for businesses ready to automate, scale, and dominate.",
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

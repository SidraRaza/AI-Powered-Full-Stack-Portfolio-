import type { Metadata } from "next";
import { AgentsHero } from "./agents-hero";
import { AgentsGrid } from "./agents-grid";
import { AgentsCTA } from "./agents-cta";

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Experience live AI agents you can interact with in real-time. See agentic AI in action with actual functionality — no mockups, no screenshots, just working AI systems.",
  keywords: [
    "AI Agents",
    "Agentic AI",
    "Interactive AI",
    "Live AI Demo",
    "AI Automation",
    "Business AI Agents",
    "Agentic Systems",
    "AI Interaction",
    "Intelligent Agents",
    "AI Applications",
    "Sidra Raza AI Agents"
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Experience live AI agents you can interact with in real-time.",
    type: "website",
    url: "https://sidraraza.xyz/agents",
    images: [
      {
        url: "/og/agents.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Experience live AI agents you can interact with in real-time.",
    images: ["/og/agents.png"],
  },
  alternates: {
    canonical: "https://sidraraza.xyz/agents",
  },
};

export default function AgentsPage() {
  return (
    <>
      <AgentsHero />
      <AgentsGrid />
      <AgentsCTA />
    </>
  );
}

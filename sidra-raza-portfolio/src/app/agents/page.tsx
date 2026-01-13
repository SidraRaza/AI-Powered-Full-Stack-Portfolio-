import type { Metadata } from "next";
import { AgentsHero } from "./agents-hero";
import { AgentsGrid } from "./agents-grid";
import { AgentsCTA } from "./agents-cta";

export const metadata: Metadata = {
  title: "Interactive AI Agents - Sidra Raza | Live Agentic AI Systems",
  description: "Experience live AI agents you can interact with in real-time. See agentic AI in action with actual functionality — no mockups, no screenshots, just working AI systems demonstrating advanced capabilities in business automation and intelligent interactions.",
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
    title: "Interactive AI Agents - Sidra Raza | Live Agentic AI Systems",
    description: "Experience live AI agents you can interact with in real-time. See agentic AI in action with actual functionality — no mockups, no screenshots, just working AI systems demonstrating advanced capabilities in business automation and intelligent interactions.",
    type: "website",
    url: "https://sidraraza.xyz/agents",
    images: [
      {
        url: "/og/agents.png",
        width: 1200,
        height: 630,
        alt: "Interactive AI Agents by Sidra Raza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive AI Agents - Sidra Raza | Live Agentic AI Systems",
    description: "Experience live AI agents you can interact with in real-time. See agentic AI in action with actual functionality — no mockups, no screenshots, just working AI systems demonstrating advanced capabilities in business automation and intelligent interactions.",
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

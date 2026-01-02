import type { Metadata } from "next";
import { AgentsHero } from "./agents-hero";
import { AgentsGrid } from "./agents-grid";
import { AgentsCTA } from "./agents-cta";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "Live AI agents you can interact with. See agentic AI in action — no mockups, no screenshots.",
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

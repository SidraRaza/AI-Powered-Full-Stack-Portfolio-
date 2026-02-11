import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "Proposal Generator",
  description:
    "Transform any project brief into a professional proposal in 30 seconds.",
  alternates: {
    canonical: "https://sidraraza.xyz/agents/proposal-generator",
  },
};

export default function ProposalGeneratorPage() {
  return <AgentDemo />;
}

import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "Proposal Generator",
  description:
    "Transform any project brief into a professional proposal in 30 seconds.",
};

export default function ProposalGeneratorPage() {
  return <AgentDemo />;
}

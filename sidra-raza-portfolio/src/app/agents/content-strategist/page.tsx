import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "Content Strategist",
  description:
    "Generate a complete content strategy from a single topic.",
  alternates: {
    canonical: "https://sidraraza.xyz/agents/content-strategist",
  },
};

export default function ContentStrategistPage() {
  return <AgentDemo />;
}

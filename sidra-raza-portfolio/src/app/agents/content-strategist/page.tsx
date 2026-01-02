import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "Content Strategist",
  description:
    "Generate a complete content strategy from a single topic.",
};

export default function ContentStrategistPage() {
  return <AgentDemo />;
}

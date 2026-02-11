import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Ask anything about working with Sidra. Available 24/7.",
  alternates: {
    canonical: "https://sidraraza.xyz/agents/ai-assistant",
  },
};

export default function AIAssistantPage() {
  return <AgentDemo />;
}

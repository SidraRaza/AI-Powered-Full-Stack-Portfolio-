import type { Metadata } from "next";
import { AgentDemo } from "./agent-demo";

export const metadata: Metadata = {
  title: "Business Idea Validator",
  description:
    "Get brutally honest feedback on your startup idea with AI analysis.",
  alternates: {
    canonical: "https://sidraraza.xyz/agents/business-validator",
  },
};

export default function BusinessValidatorPage() {
  return <AgentDemo />;
}

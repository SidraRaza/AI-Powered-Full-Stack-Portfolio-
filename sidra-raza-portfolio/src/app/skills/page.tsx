import type { Metadata } from "next";
import { SkillsHero } from "./skills-hero";
import { SkillBlocks } from "./skill-blocks";
import { TechStackVisual } from "./tech-stack-visual";
import { SkillsCTA } from "./skills-cta";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Full-stack agentic AI development. From strategy to deployment, from prototype to production.",
};

export default function SkillsPage() {
  return (
    <>
      <SkillsHero />
      <SkillBlocks />
      <TechStackVisual />
      <SkillsCTA />
    </>
  );
}

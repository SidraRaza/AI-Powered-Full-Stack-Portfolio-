import type { Metadata } from "next";
import { SkillsHero } from "./skills-hero";
import { SkillBlocks } from "./skill-blocks";
import { TechStackVisual } from "./tech-stack-visual";
import { SkillsCTA } from "./skills-cta";

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Explore my expertise in full-stack AI development. From strategy to deployment, from prototype to production. Specializing in advanced AI systems, machine learning, and business automation solutions.",
  keywords: [
    "AI Skills",
    "Agentic AI",
    "Full-Stack AI Development",
    "Machine Learning",
    "AI Expertise",
    "AI Development Skills",
    "Business Automation",
    "AI Systems",
    "Advanced AI",
    "AI Engineering",
    "Sidra Raza Skills"
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Explore my expertise in full-stack AI development. From strategy to deployment, from prototype to production.",
    type: "website",
    url: "https://sidraraza.xyz/skills",
    images: [
      {
        url: "/og/skills.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Explore my expertise in full-stack AI development. From strategy to deployment, from prototype to production.",
    images: ["/og/skills.png"],
  },
  alternates: {
    canonical: "https://sidraraza.xyz/skills",
  },
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

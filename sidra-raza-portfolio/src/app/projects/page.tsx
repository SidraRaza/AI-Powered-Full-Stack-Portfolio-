import type { Metadata } from "next";
import { ProjectsHero } from "./projects-hero";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsCTA } from "./projects-cta";

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Explore real AI systems and projects with tangible results. See how I've solved complex business problems with agentic AI, automation, and intelligent systems. Real clients, real solutions, real impact.",
  keywords: [
    "AI Projects",
    "AI Portfolio",
    "Agentic AI Projects",
    "AI Solutions",
    "Business Automation Projects",
    "AI Case Studies",
    "Machine Learning Projects",
    "AI Development Portfolio",
    "AI for Business",
    "Agentic Systems",
    "Sidra Raza Projects",
    "Word Weaver AI Planner",
    "AI Writing Assistant",
    "Study Assistant AI",
    "Sidra Raza",
    "Sidra Pakistan",
    "Sidra Raza Karachi",
    "Famous Agentic AI Developer for Pakistan",
    "Agentic AI Developer from Pakistan"
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Explore real AI systems and projects with tangible results. See how I've solved complex business problems with agentic AI, automation, and intelligent systems.",
    type: "website",
    url: "https://sidraraza.xyz/projects",
    images: [
      {
        url: "/og/projects.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Explore real AI systems and projects with tangible results.",
    images: ["/og/projects.png"],
  },
  alternates: {
    canonical: "https://sidraraza.xyz/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </>
  );
}

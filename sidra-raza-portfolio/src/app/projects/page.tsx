import type { Metadata } from "next";
import { ProjectsHero } from "./projects-hero";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsCTA } from "./projects-cta";

export const metadata: Metadata = {
  title: "AI Projects Portfolio - Sidra Raza | Real Systems, Real Results",
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
    "Sidra Raza Projects"
  ],
  openGraph: {
    title: "AI Projects Portfolio - Sidra Raza | Real Systems, Real Results",
    description: "Explore real AI systems and projects with tangible results. See how I've solved complex business problems with agentic AI, automation, and intelligent systems. Real clients, real solutions, real impact.",
    type: "website",
    url: "https://sidraraza.xyz/projects",
    images: [
      {
        url: "/og/projects.png",
        width: 1200,
        height: 630,
        alt: "AI Projects Portfolio by Sidra Raza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Projects Portfolio - Sidra Raza | Real Systems, Real Results",
    description: "Explore real AI systems and projects with tangible results. See how I've solved complex business problems with agentic AI, automation, and intelligent systems. Real clients, real solutions, real impact.",
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

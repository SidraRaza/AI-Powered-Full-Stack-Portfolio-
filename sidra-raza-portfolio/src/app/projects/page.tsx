import type { Metadata } from "next";
import { ProjectsHero } from "./projects-hero";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsCTA } from "./projects-cta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real systems. Real results. Real clients. See how I've solved business problems with AI.",
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

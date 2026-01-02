import type { Metadata } from "next";
import { AboutHero } from "./about-hero";
import { Philosophy } from "./philosophy";
import { Expertise } from "./expertise";
import { Personal } from "./personal";

export const metadata: Metadata = {
  title: "About",
  description:
    "I solve business problems with code that thinks. Learn about my approach to agentic AI development.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Philosophy />
      <Expertise />
      <Personal />
    </>
  );
}

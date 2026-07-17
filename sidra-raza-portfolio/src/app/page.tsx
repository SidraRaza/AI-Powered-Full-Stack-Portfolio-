import { ProblemSolution, FeaturedAgents, ServicesOverview, Metrics, FinalCTA } from "@/components/home";
import HeroSection from "@/components/hero/hero-section";
import BlogPreview from "@/components/blog/blog-preview";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { getLatestBlogPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sidra Raza – Full Stack & Agentic AI Engineer",

  description:
    "Sidra Raza is a Full Stack & Agentic AI Developer from Karachi, Pakistan. She builds scalable web applications, intelligent AI agents, and automation systems that help businesses operate smarter, faster, and 24/7.",

  keywords: [
    "Sidra Raza",
    "Sidra Raza Pakistan",
    "Sidra Raza Karachi",
    "Full Stack Agentic AI Engineer",
    "Full Stack AI Developer Pakistan",
    "AI Engineer Pakistan",
    "Next.js Developer Pakistan",
    "Agentic AI Developer",
    "AI Automation Expert",
    "AI Systems Developer",
    "AI Portfolio",
    "Next.js TypeScript Developer",
    "AI SaaS Developer",
    "Intelligent Automation",
    "AI Ops Studio"
  ],

  openGraph: {
    title:
      "Sidra Raza – Full Stack & Agentic AI Developer",
    description:
      "Full Stack & Agentic AI Developer specializing in AI systems, Next.js applications, and intelligent automation platforms for real-world production use.",
    type: "website",
    url: "https://sidraraza.xyz/",
    siteName: "Sidra Raza Portfolio",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Sidra Raza – Full Stack & Agentic AI Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Sidra Raza – Full Stack & Agentic AI Developer",
    description:
      "Building scalable web apps, AI agents, and automation systems using Next.js, TypeScript, and modern full stack architecture.",
    images: ["/og/home.png"],
  },

  alternates: {
    canonical: "https://sidraraza.xyz/",
  },
};

export default async function Home() {
  // Get latest 3 blog posts for preview
  const latestPosts = await getLatestBlogPosts(3);

  return (
    <>
      <ScrollReveal direction="none" duration={0.8}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6}>
        <ProblemSolution />
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6} delay={0.1}>
        <FeaturedAgents />
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6} delay={0.2}>
        <ServicesOverview />
      </ScrollReveal>
      {latestPosts.length > 0 && (
        <ScrollReveal direction="up" duration={0.6} delay={0.3}>
          <BlogPreview posts={latestPosts} />
        </ScrollReveal>
      )}
      <ScrollReveal direction="up" duration={0.6} delay={0.4}>
        <Metrics />
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6} delay={0.5}>
        <FinalCTA />
      </ScrollReveal>
    </>
  );
}

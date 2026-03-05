/**
 * Portfolio Data for RAG Chatbot Knowledge Base
 * 
 * This file contains structured portfolio information that will be
 * chunked and embedded for the RAG chatbot system.
 * 
 * Update this file whenever portfolio content changes.
 */

import type { PortfolioData } from '@/types/chat';

/**
 * Complete portfolio data for knowledge base initialization
 */
export const portfolioData: PortfolioData = {
  about: {
    summary: "Sidra Raza is a Full Stack & Agentic AI Developer from Karachi, Pakistan. She specializes in building scalable web applications, intelligent AI agents, and automation systems that help businesses operate smarter, faster, and 24/7. Her expertise lies in combining modern web technologies with cutting-edge AI to create production-ready solutions.",
    background: "Sidra focuses on AI automation and agentic systems, helping businesses automate workflows and build intelligent systems. She works with technologies like Next.js, Python, OpenAI, Claude, LangChain, and various AI automation platforms. Her approach emphasizes building AI that runs your business while you sleep.",
  },
  skills: {
    Languages: ["Python", "TypeScript", "SQL"],
    "AI/ML": ["OpenAI", "Claude", "LangChain", "LlamaIndex", "RAG Pipelines", "Fine-tuning", "Agent Systems"],
    Infrastructure: ["Supabase", "Vercel", "AWS", "Docker", "PostgreSQL"],
    "Web Stack": ["Next.js", "React", "Node.js", "FastAPI", "Tailwind CSS"],
    Automation: ["n8n", "Make", "Custom Agents", "Workflow Automation"],
    Tools: ["Git", "Framer Motion", "Radix UI", "Drizzle ORM"],
  },
  services: [
    {
      title: "AI Automation",
      description: "Automate business workflows with intelligent AI agents. From customer support to data processing, build systems that work 24/7 without manual intervention.",
    },
    {
      title: "Agentic AI Systems",
      description: "Design and build autonomous AI agents that can plan, reason, and execute complex tasks. Multi-agent systems for enterprise automation.",
    },
    {
      title: "Full Stack Development",
      description: "Build production-ready web applications using Next.js, React, and modern technologies. Responsive, performant, and scalable solutions.",
    },
    {
      title: "AI Integration",
      description: "Integrate AI capabilities into existing applications. RAG pipelines, chatbots, content generation, and intelligent data processing.",
    },
    {
      title: "AI Consulting",
      description: "Strategic guidance on AI adoption, technology selection, and implementation roadmaps. Identify automation opportunities in your business.",
    },
  ],
  projects: [
    {
      title: "AI Ops Studio",
      description: "A comprehensive AI automation platform for business workflow management. Features intelligent task scheduling, automated reporting, and multi-agent collaboration.",
      technologies: ["Next.js", "Python", "OpenAI", "Supabase"],
      url: "/projects/ai-ops-studio",
    },
    {
      title: "Word Weaver AI Planner",
      description: "An AI-powered content planning and generation tool. Helps content creators plan, outline, and generate high-quality content using advanced language models.",
      technologies: ["Next.js", "Claude", "Framer Motion"],
      url: "/projects/word-weaver",
    },
    {
      title: "RAG Chatbot System",
      description: "Production-ready RAG chatbot for portfolio websites. Answers questions using vector similarity search and semantic retrieval from knowledge base.",
      technologies: ["Next.js", "OpenAI", "TypeScript", "Framer Motion"],
      url: "/projects/rag-chatbot",
    },
    {
      title: "Business Automation Dashboard",
      description: "Analytics dashboard for monitoring AI automation workflows. Real-time metrics, error tracking, and performance optimization insights.",
      technologies: ["Next.js", "Recharts", "Upstash Redis"],
      url: "/dashboard",
    },
  ],
  experience: [
    {
      company: "Freelance AI Developer",
      role: "Full Stack & Agentic AI Developer",
      duration: "2023-Present",
      description: "Building AI-powered web applications and automation systems for clients. Specializing in Next.js, AI agent development, and business workflow automation.",
    },
    {
      company: "AI Ops Studio",
      role: "Founder & Lead Developer",
      duration: "2024-Present",
      description: "Founded AI automation studio focusing on agentic systems and intelligent workflow solutions. Delivering production-ready AI systems for businesses.",
    },
  ],
  contact: {
    email: "contact@sidraraza.xyz",
    linkedin: "https://linkedin.com/in/sidraraza",
    github: "https://github.com/sidraraza",
    website: "https://sidraraza.xyz",
  },
  blog: [
    {
      title: "Building Agentic AI Systems",
      summary: "Learn how to design and build autonomous AI agents that can plan, reason, and execute complex tasks. Covers agent architectures, planning algorithms, and multi-agent collaboration.",
      url: "/blog/building-agentic-ai-systems",
    },
    {
      title: "RAG vs Fine-tuning: When to Use Each",
      summary: "A comprehensive guide on choosing between Retrieval-Augmented Generation and fine-tuning for your AI applications. Pros, cons, and practical recommendations.",
      url: "/blog/rag-vs-fine-tuning",
    },
    {
      title: "Next.js 14 App Router Best Practices",
      summary: "Essential patterns and best practices for building production applications with Next.js 14 App Router. Server components, streaming, and performance optimization.",
      url: "/blog/nextjs-14-best-practices",
    },
    {
      title: "AI Automation for Business Workflows",
      summary: "How to identify and automate business processes using AI. Real-world examples of workflow automation that save time and reduce manual work.",
      url: "/blog/ai-automation-business-workflows",
    },
  ],
};

/**
 * Get a brief summary of portfolio content for quick reference
 */
export function getPortfolioSummary(): string {
  return `
Sidra Raza - Full Stack & Agentic AI Developer
Location: Karachi, Pakistan

Key Skills:
- Languages: Python, TypeScript, SQL
- AI/ML: OpenAI, Claude, LangChain, RAG Pipelines, Agent Systems
- Web: Next.js, React, Node.js, FastAPI
- Infrastructure: Supabase, Vercel, AWS, Docker

Services:
- AI Automation & Agentic Systems
- Full Stack Development
- AI Integration & Consulting

Notable Projects:
- AI Ops Studio (AI automation platform)
- Word Weaver AI Planner (content generation)
- RAG Chatbot System (portfolio chatbot)

Contact: contact@sidraraza.xyz
Website: sidraraza.xyz
  `.trim();
}

export default portfolioData;

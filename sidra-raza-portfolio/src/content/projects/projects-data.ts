export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "word-weaver-ai-planner",
    title: "Word Weaver AI Planner",
    client: "Personal AI Project",
    industry: "AI & Education",
    problem:
      "Students and professionals struggling with assignments, essays, blogs, and creative projects. Time-consuming writing process with limited assistance tools.",
    solution:
      "WordWeaver AI Planner is an AI-powered writing and study assistant that helps users with assignments, essays, blogs, and creative projects. It allows users to easily edit content, copy text, and download their work from a single seamless platform.",
    stack: ["AI", "Natural Language Processing", "Study Assistance", "Writing Tools"],
    metrics: [
      { label: "Get instant help for assignments 📄 and creative projects 🎨", value: "" },
      { label: "Easily edit ✏️, copy 📋, and download ⬇️ your work", value: "" },
      { label: "All in one seamless platform", value: "" },
      { label: "Powered by advanced AI technology", value: "" },
    ],
    featured: true,
  },
  {
    slug: "autonomous-lead-qualification",
    title: "Autonomous Lead Qualification Agent",
    client: "B2B SaaS Company",
    industry: "Technology",
    problem:
      "Sales team spent 15+ hours weekly qualifying leads manually. Response times averaged 8 hours. Hot leads went cold.",
    solution:
      "Built an agentic system that scores incoming leads, researches company data, and routes qualified prospects directly to calendars — with personalized outreach sent automatically.",
    stack: ["Python", "Claude API", "Supabase", "n8n", "Slack Integration"],
    metrics: [
      { label: "Qualification time reduction", value: "85%" },
      { label: "Average response time", value: "12 min" },
      { label: "Increase in booked demos", value: "32%" },
      { label: "Pipeline influenced (first month)", value: "$45K" },
    ],
    featured: true,
  },
  {
    slug: "document-processing-pipeline",
    title: "Intelligent Document Processing Pipeline",
    client: "Legal Tech Startup",
    industry: "Legal",
    problem:
      "Lawyers spending 40% of their time extracting key information from contracts. High error rates and inconsistent formatting.",
    solution:
      "Created an AI pipeline that extracts, validates, and structures contract data with 98% accuracy. Includes human-in-the-loop review for edge cases.",
    stack: ["Python", "OpenAI", "FastAPI", "PostgreSQL", "React"],
    metrics: [
      { label: "Time saved per contract", value: "75%" },
      { label: "Extraction accuracy", value: "98%" },
      { label: "Documents processed monthly", value: "4,000+" },
      { label: "Annual savings", value: "$120K" },
    ],
    featured: true,
  },
  {
    slug: "customer-support-automation",
    title: "AI-Powered Customer Support System",
    client: "E-commerce Platform",
    industry: "Retail",
    problem:
      "Support team overwhelmed with repetitive queries. Average resolution time was 24 hours. Customer satisfaction dropping.",
    solution:
      "Deployed an intelligent support agent that handles 70% of queries autonomously, escalates complex issues intelligently, and provides agents with AI-assisted responses.",
    stack: ["TypeScript", "Claude API", "Next.js", "Supabase", "Intercom"],
    metrics: [
      { label: "Queries handled autonomously", value: "70%" },
      { label: "Resolution time reduction", value: "80%" },
      { label: "Customer satisfaction increase", value: "25%" },
      { label: "Support cost reduction", value: "45%" },
    ],
    featured: true,
  },
];

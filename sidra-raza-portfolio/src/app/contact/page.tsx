import type { Metadata } from "next";
import { ContactHero } from "./contact-hero";
import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Get in touch for AI engineering projects, consultations, and collaboration opportunities. Discuss your automation needs and AI system requirements.",
  keywords: [
    "Contact Sidra Raza",
    "AI Engineer Contact",
    "Hire AI Developer",
    "AI Consulting",
    "AI Automation Services",
    "Agentic AI Developer",
    "AI Project Inquiry",
    "Sidra Raza Pakistan",
    "AI Developer Karachi"
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Get in touch for AI engineering projects and consultations.",
    type: "website",
    url: "https://sidraraza.xyz/contact"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Get in touch for AI engineering projects and consultations."
  },
  alternates: {
    canonical: "https://sidraraza.xyz/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  );
}

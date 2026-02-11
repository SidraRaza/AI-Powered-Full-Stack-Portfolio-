import type { Metadata } from "next";
import { ContactHero } from "./contact-hero";
import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's build something intelligent. Book a call or send a message.",
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

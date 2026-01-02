import type { Metadata } from "next";
import { ServicesHero } from "./services-hero";
import { ServiceTiers } from "./service-tiers";
import { FAQ } from "./faq";
import { ServicesCTA } from "./services-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI that works for your business. From strategy sessions to full-scale builds.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceTiers />
      <FAQ />
      <ServicesCTA />
    </>
  );
}

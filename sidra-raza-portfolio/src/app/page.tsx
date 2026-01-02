import {
  Hero,
  ProblemSolution,
  FeaturedAgents,
  ServicesOverview,
  Metrics,
  FinalCTA,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <FeaturedAgents />
      <ServicesOverview />
      <Metrics />
      <FinalCTA />
    </>
  );
}

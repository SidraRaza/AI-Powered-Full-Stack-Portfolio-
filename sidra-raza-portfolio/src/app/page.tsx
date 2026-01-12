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

    {/* my main page */}
      <Hero />
      <ProblemSolution />
      <FeaturedAgents />
      <ServicesOverview />
      <Metrics />
      <FinalCTA />
    </>
  );
}

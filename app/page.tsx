import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Solutions } from "@/components/sections/Solutions";
import { AutonomyStack } from "@/components/sections/AutonomyStack";
import { Vehicles } from "@/components/sections/Vehicles";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

// Landing-page narrative:
//   Hero → Manifesto → Solutions (what we enable: Enterprise | Defense)
//   → Vehicles (the platforms that carry it) → AutonomyStack (the brain)
//   → Hyderabad (the place) → Engage.
// Solutions leads with the missions and routes into /enterprise + /defense;
// the airframes + stack below it are the "how". The doctrine-heavy sections
// (DeniedEnvironment + OperatingBounds) live on /mission. Geographies remains
// parked in components/sections/ for a possible future sub-route.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Solutions />
      <Vehicles />
      <AutonomyStack />
      <Hyderabad />
      <ClosingCTA />
    </>
  );
}

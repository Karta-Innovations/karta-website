import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { AutonomyStack } from "@/components/sections/AutonomyStack";
import { Vehicles } from "@/components/sections/Vehicles";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

// Landing-page narrative after the reshuffle:
//   Hero → Manifesto → Vehicles (the airframes) → AutonomyStack (the brain)
//   → Hyderabad (the place) → Engage.
// The doctrine-heavy sections (DeniedEnvironment + OperatingBounds) live
// on /mission - see app/mission/page.tsx. Geographies remains parked in
// components/sections/ for a possible future sub-route.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Vehicles />
      <AutonomyStack />
      <Hyderabad />
      <ClosingCTA />
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { AutonomyStack } from "@/components/sections/AutonomyStack";
import { DeniedEnvironment } from "@/components/sections/DeniedEnvironment";
import { Vehicles } from "@/components/sections/Vehicles";
import { OperatingBounds } from "@/components/sections/OperatingBounds";
import { Geographies } from "@/components/sections/Geographies";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <AutonomyStack />
      <DeniedEnvironment />
      <Vehicles />
      <OperatingBounds />
      <Geographies />
      <Hyderabad />
      <ClosingCTA />
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { GrandScheme } from "@/components/sections/GrandScheme";
import { Vehicles } from "@/components/sections/Vehicles";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

// Landing-page narrative, stack-forward:
//   Hero -> Manifesto -> GrandScheme (the operational autonomy layer:
//   situational intelligence, mission loop, and three-layer IP stack) ->
//   Vehicles (the airframes it carries, and any third-party autonomous system)
//   -> Hyderabad (the place) -> Engage.
// The product IS the stack, so the page leads with one consolidated stack
// section rather than splitting "what makes it possible" from the stack itself.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <GrandScheme />
      <Vehicles />
      <Hyderabad />
      <ClosingCTA />
    </>
  );
}

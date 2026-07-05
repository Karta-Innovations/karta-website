import { Hero } from "@/components/sections/Hero";
import { DeniedEnvironment } from "@/components/sections/DeniedEnvironment";
import { Manifesto } from "@/components/sections/Manifesto";
import { GrandScheme } from "@/components/sections/GrandScheme";
import { Vehicles } from "@/components/sections/Vehicles";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

// Landing-page narrative, problem-first:
//   Hero (the promise) -> DeniedEnvironment (the problem, dramatized - one
//   flight holds its mission through GPS loss, comms jamming, blinded
//   cameras, and operator saturation as the page sinks toward black) ->
//   Manifesto (the turn: what we believe, the page surfaces again) ->
//   GrandScheme (the answer: the stack and its loop) -> Vehicles (the
//   airframes that carry it) -> Hyderabad (the place) -> Engage.
// The denied-environment sequence also lives on /mission in its doctrine
// context; here it runs as the "why" beat before any product is named.
export default function HomePage() {
  return (
    <>
      <Hero />
      <DeniedEnvironment variant="home" />
      <Manifesto />
      <GrandScheme />
      <Vehicles />
      <Hyderabad />
      <ClosingCTA />
    </>
  );
}

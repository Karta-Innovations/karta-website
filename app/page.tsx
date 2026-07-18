import { Hero } from "@/components/sections/Hero";
import { OperationalReality } from "@/components/sections/OperationalReality";
import { StackAct } from "@/components/sections/StackAct";
import { DoctrineAct } from "@/components/sections/DoctrineAct";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { LandingAct } from "@/components/sections/LandingAct";

// The One Sortie - the whole site is one mission, told in acts. The scroll
// is the flight; a mission clock runs from launch to wheels-down:
//   #launch   T-00:00  Hero - texture-masked AUTONOMY, the hook, the deck
//   #brief              Plan and denied reality, told as one operating problem
//   #stack    T+01:08  The answer - mnemonic band + three layers + the loop
//   #mission            The mission - why autonomous systems must be bounded
//   #hyderabad         Ground truth - built close to the work
//   #landing  T+01:42  Wheels down - record sealed, the asks
// Field Notes and Careers are libraries on separate routes; /stack and
// /mission redirect into their acts here.
export default function HomePage() {
  return (
    <>
      <Hero />
      <OperationalReality />
      <StackAct />
      <DoctrineAct />
      <Hyderabad />
      <LandingAct />
    </>
  );
}

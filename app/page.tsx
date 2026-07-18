import { Hero } from "@/components/sections/Hero";
import { BriefPlate } from "@/components/sections/BriefPlate";
import { DeniedEnvironment } from "@/components/sections/DeniedEnvironment";
import { StackAct } from "@/components/sections/StackAct";
import { DoctrineAct } from "@/components/sections/DoctrineAct";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { LandingAct } from "@/components/sections/LandingAct";

// The One Sortie - the whole site is one mission, told in acts. The scroll
// is the flight; a mission clock runs from launch to wheels-down:
//   #launch   T-00:00  Hero - texture-masked AUTONOMY, the hook, the deck
//   #brief    T-01:12  The plan is perfect (daylight corridor plate)
//   #denial   T+00:38  The night takes the plan apart (fault sequence)
//   #stack    T+01:08  The answer - mnemonic band + three layers + the loop
//   #mission  T+01:20  The rules - doctrine, bounds, the karta etymology
//   #hyderabad         Ground truth - built close to the work
//   #landing  T+01:42  Wheels down - record sealed, the asks
// Field Notes and Careers are libraries on separate routes; /stack and
// /mission redirect into their acts here.
export default function HomePage() {
  return (
    <>
      <Hero />
      <BriefPlate />
      <DeniedEnvironment variant="home" />
      <StackAct />
      <DoctrineAct />
      <Hyderabad />
      <LandingAct />
    </>
  );
}

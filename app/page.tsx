import { Company } from "@/components/sections/Company";
import { FieldBand } from "@/components/sections/FieldBand";
import { Hero } from "@/components/sections/Hero";
import { Questions } from "@/components/sections/Questions";
import { SkyAnchorBand } from "@/components/sections/SkyAnchorBand";
import { Stack } from "@/components/sections/Stack";
import { Statement } from "@/components/sections/Statement";
import { Systems } from "@/components/sections/Systems";
import { Tenere } from "@/components/sections/Tenere";

/**
 * The homepage, in the order a first-time visitor needs it: the claim, what
 * Karta is, the frame, the two systems, where they sit on a customer's
 * aircraft, and who is behind them. Flights have a page of their own.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Systems />
      <Statement />
      <Questions />
      <SkyAnchorBand />
      <Tenere />
      <Stack />
      <FieldBand />
      <Company />
    </>
  );
}

import type { Metadata } from "next";
import { SolutionPage } from "@/components/sections/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Defense",
  description:
    "Persistent ISR, overwatch and resilient comms in contested, GPS-denied airspace. Accountable autonomy under human intent, audited from contract to flight.",
};

export default function DefensePage() {
  return <SolutionPage vertical="defense" />;
}

import type { Metadata } from "next";
import { SolutionPage } from "@/components/sections/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Autonomous inspection, mapping and monitoring for energy, infrastructure, resources and response. Works GPS-denied, all-weather, one operator across the fleet, audited by default.",
};

export default function EnterprisePage() {
  return <SolutionPage vertical="enterprise" />;
}

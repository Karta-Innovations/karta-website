import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StackAct } from "@/components/sections/StackAct";
import { DoctrineAct } from "@/components/sections/DoctrineAct";
import { Hyderabad } from "@/components/sections/Hyderabad";
import { LandingAct } from "@/components/sections/LandingAct";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karta Innovations",
    url: "/",
    title: "Karta Innovations - Operational autonomy",
    description:
      "Karta builds the operational autonomy layer that helps unmanned systems stay oriented, act within human-approved intent, and return a reviewable record as operating conditions degrade.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackAct />
      <DoctrineAct />
      <Hyderabad />
      <LandingAct />
    </>
  );
}

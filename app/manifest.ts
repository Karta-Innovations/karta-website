import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} · The brain for unmanned systems`,
    short_name: SITE.short,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f2e",
    theme_color: "#0b0f2e",
    icons: [
      { src: "/brand/karta-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/karta-icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/brand/karta-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karta Innovations - Operational autonomy",
    short_name: "Karta",
    description:
      "Karta Innovations builds the operational autonomy layer for autonomous systems in GPS- and comms-denied environments.",
    start_url: "/",
    display: "standalone",
    background_color: "#071008",
    theme_color: "#071008",
    icons: [
      {
        src: "/brand/karta-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/karta-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

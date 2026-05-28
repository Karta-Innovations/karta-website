import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karta - Operational autonomy",
    short_name: "Karta",
    description:
      "Karta builds the operational autonomy stack for unmanned systems in GPS- and comms-denied environments.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1020",
    theme_color: "#0B1020",
    icons: [
      {
        src: "/imagery/karta_Icon-removebg-preview.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/imagery/karta_Icon-removebg-preview.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

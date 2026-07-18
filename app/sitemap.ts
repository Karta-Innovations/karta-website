import type { MetadataRoute } from "next";
import { NOTES } from "@/lib/content/notes";
import { ROLES } from "@/lib/content/roles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karta.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/field-notes`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/engage`, lastModified: now, priority: 0.6 },
  ];

  const noteRoutes = NOTES.map((n) => ({
    url: `${SITE_URL}/field-notes/${n.slug}`,
    lastModified: new Date(n.date),
    priority: 0.6,
  }));

  const roleRoutes = ROLES.filter((r) => r.status === "open").map((r) => ({
    url: `${SITE_URL}/careers/${r.slug}`,
    lastModified: new Date(r.postedAt),
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes, ...roleRoutes];
}

import type { MetadataRoute } from "next";
import { NOTES } from "@/lib/content/notes";
import { ROLES } from "@/lib/content/roles";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/skyanchor`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/field-notes`, lastModified: now, priority: 0.7 },
    { url: `${SITE.url}/careers`, lastModified: now, priority: 0.7 },
    { url: `${SITE.url}/engage`, lastModified: now, priority: 0.6 },
  ];

  const noteRoutes = NOTES.map((note) => ({
    url: `${SITE.url}/field-notes/${note.slug}`,
    lastModified: new Date(note.date),
    priority: 0.6,
  }));

  const roleRoutes = ROLES.filter((role) => role.status === "open").map((role) => ({
    url: `${SITE.url}/careers/${role.slug}`,
    lastModified: new Date(role.postedAt),
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes, ...roleRoutes];
}

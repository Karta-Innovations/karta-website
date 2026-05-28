"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Theme-aware palette consumed by 3D scenes.
 *
 * 3D shaders take hex strings, not CSS custom properties - so we can't rely
 * on the CSS-var cascade like the rest of the site does. This hook reads the
 * active theme from `document.documentElement.dataset.theme` and returns a
 * resolved palette of hex values matching the CSS tokens.
 *
 * Updates automatically when the theme flips via MutationObserver on the
 * `data-theme` attribute - no global event bus needed.
 */
export interface ThemePalette {
  /** Page baseline surface (--color-ink) */
  ink: string;
  /** Lifted content surface (--color-ink-2) */
  ink2: string;
  /** Primary body text (--color-fg) */
  fg: string;
  /** Sparse single accent (--color-amber) */
  amber: string;
  /** Amber deepened (--color-amber-deep) */
  amberDeep: string;
  /** Borders / hairlines (--color-border) */
  border: string;
  /** Indigo / surface lift (--color-surface) */
  surface: string;

  /* ------- Domain-specific palette mixes per scene ------- */

  /** Hero terrain - three-value palette tuned for both themes */
  terrain: {
    valley: string;
    ridge: string;
    contour: string;
    /** Optional fog color; null disables atmospheric fade in light mode */
    fog: string | null;
  };
  /** Hyderabad city silhouette - darker than bg in both themes */
  citySilhouette: string;
  /** Edge LiDAR point cloud - accent so it reads against both surfaces */
  lidar: string;
  /** Theatre wireframe - accent (with bloom in dark mode) */
  wireframe: string;
}

const DARK: ThemePalette = {
  ink: "#0B1020",
  ink2: "#131A36",
  fg: "#F5F5F0",
  amber: "#C8962E",
  amberDeep: "#9D7421",
  border: "#232C4E",
  surface: "#1B244A",
  terrain: {
    valley: "#0B1020",
    ridge: "#1B244A",
    contour: "#C8962E",
    fog: "#0B1020",
  },
  citySilhouette: "#06091B",
  lidar: "#C8962E",
  wireframe: "#C8962E",
};

const LIGHT: ThemePalette = {
  ink: "#F5F5F0",
  ink2: "#FFFFFF",
  fg: "#0B1020",
  amber: "#B8862A",
  amberDeep: "#8C631B",
  border: "#D6DAE4",
  surface: "#FFFFFF",
  terrain: {
    // Cream valleys, warm-tan ridges, deeper amber contours.
    // No fog - atmospheric haze reads weird on cream; let the edges fade cleanly.
    valley: "#E8E3D5",
    ridge: "#D8C49B",
    contour: "#8C631B",
    fog: null,
  },
  // Pale grey buildings sit *below* the bg in luminance but feel soft, not bold.
  citySilhouette: "#C8CFDC",
  // Deeper amber so the point cloud reads as warm accent against cream.
  lidar: "#8C631B",
  // Same - bloom turns off in light mode (handled by scene component).
  wireframe: "#8C631B",
};

export function useThemeColors(): ThemePalette {
  const [palette, setPalette] = useState<ThemePalette>(DARK);

  useEffect(() => {
    const html = document.documentElement;

    const read = () => {
      const current = (html.dataset.theme as Theme | undefined) ?? "dark";
      setPalette(current === "light" ? LIGHT : DARK);
    };

    read();
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.attributeName === "data-theme") {
          read();
          break;
        }
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return palette;
}

/**
 * Synchronous lookup for code paths outside React (rare). Most callers should
 * use the hook so they re-render on theme change.
 */
export function getThemePalette(): ThemePalette {
  if (typeof document === "undefined") return DARK;
  const t = (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
  return t === "light" ? LIGHT : DARK;
}

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
  ink: "#070B18",
  ink2: "#0E1426",
  fg: "#F3F6FC",
  amber: "#4D8DFF",
  amberDeep: "#1E40AF",
  border: "#1E2747",
  surface: "#141C36",
  terrain: {
    valley: "#070B18",
    ridge: "#17224A",
    contour: "#4D8DFF",
    fog: "#070B18",
  },
  citySilhouette: "#04060F",
  lidar: "#4D8DFF",
  wireframe: "#4D8DFF",
};

const LIGHT: ThemePalette = {
  ink: "#EDF2FB",
  ink2: "#FFFFFF",
  fg: "#0B1430",
  amber: "#155EEF",
  amberDeep: "#1E40AF",
  border: "#D7E0EE",
  surface: "#FFFFFF",
  terrain: {
    // Cool sky-white valleys, soft blue-grey ridges, azure contours.
    // No fog - atmospheric haze reads odd on a bright surface.
    valley: "#DCE6F6",
    ridge: "#B7C9E6",
    contour: "#155EEF",
    fog: null,
  },
  // Pale blue-grey buildings sit just below the bg in luminance.
  citySilhouette: "#AEC0DC",
  lidar: "#155EEF",
  wireframe: "#155EEF",
};

export function useThemeColors(): ThemePalette {
  const [palette, setPalette] = useState<ThemePalette>(LIGHT);

  useEffect(() => {
    const html = document.documentElement;

    const read = () => {
      const current = (html.dataset.theme as Theme | undefined) ?? "dark";
      setPalette(current === "dark" ? DARK : LIGHT);
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
  return t === "dark" ? DARK : LIGHT;
}

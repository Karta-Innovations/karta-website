/**
 * Resolved palette consumed by 3D scenes.
 *
 * 3D shaders take hex strings, not CSS custom properties, so scenes cannot
 * ride the CSS-var cascade. These values mirror the OKLCH tokens in CSS.
 * Change both places together.
 */
export interface ThemePalette {
  /** Page baseline surface (--color-ink) */
  ink: string;
  /** Lifted content surface (--color-ink-2) */
  ink2: string;
  /** Primary body text (--color-fg) */
  fg: string;
  /** Human-intent accent (--color-flare) */
  flare: string;
  /** Flare deepened (--color-flare-deep) */
  flareDeep: string;
  /** Borders / hairlines (--color-border) */
  border: string;
  /** Sage / surface lift (--color-surface) */
  surface: string;

  /* ------- Domain-specific palette mixes per scene ------- */

  /** Hero terrain - valley/ridge/contour trio plus atmospheric fog */
  terrain: {
    valley: string;
    ridge: string;
    contour: string;
    /** Fog color; null disables atmospheric fade */
    fog: string | null;
  };
  /** Hyderabad city silhouette - darker than bg */
  citySilhouette: string;
  /** Edge LiDAR point cloud - accent so it reads against the surface */
  lidar: string;
  /** Theatre wireframe - accent with bloom */
  wireframe: string;
}

const DARK: ThemePalette = {
  ink: "#071008",
  ink2: "#0E180D",
  fg: "#DDE3DC",
  flare: "#C0392B",
  flareDeep: "#901F15",
  border: "#293726",
  surface: "#162213",
  terrain: {
    valley: "#071008",
    ridge: "#32432B",
    contour: "#A0BA95",
    fog: "#071008",
  },
  citySilhouette: "#030603",
  lidar: "#A0BA95",
  wireframe: "#A0BA95",
};

/**
 * Kept as a hook so existing scene call sites don't churn; it now returns
 * the constant dark palette (no observers - there is nothing to observe).
 */
export function useThemeColors(): ThemePalette {
  return DARK;
}

/** Synchronous lookup for code paths outside React (rare). */
export function getThemePalette(): ThemePalette {
  return DARK;
}

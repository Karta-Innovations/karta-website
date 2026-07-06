/**
 * Resolved palette consumed by 3D scenes.
 *
 * 3D shaders take hex strings, not CSS custom properties - so scenes can't
 * ride the CSS-var cascade like the rest of the site. The site is dark-only,
 * so the palette is a constant mirroring the tokens in app/globals.css.
 * Change both places together.
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

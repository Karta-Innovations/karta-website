"use client";

import { type ReactNode } from "react";
import { CanvasShell } from "./CanvasShell";
import { TerrainMesh } from "./TerrainMesh";
import { useThemeColors } from "@/lib/useThemeColors";

interface EnvelopeTerrainSceneProps {
  fallback: ReactNode;
  className?: string;
  /**
   * Envelope id from the Geographies catalogue. Maps to terrain amplitude and
   * contour palette so each tab feels distinct without commissioning per-envelope shaders.
   */
  envelope: string;
}

interface EnvelopeTuning {
  amplitude: number;
  /** Dark-mode (contour, ridge) and light-mode (contour, ridge) pairs. */
  dark: { contour: string; ridge: string };
  light: { contour: string; ridge: string };
}

const TUNING: Record<string, EnvelopeTuning> = {
  highaltitude: {
    amplitude: 5.2,
    dark: { contour: "#C8962E", ridge: "#1B244A" },
    light: { contour: "#8C631B", ridge: "#D8C49B" },
  },
  arid: {
    amplitude: 2.0,
    dark: { contour: "#D8A84F", ridge: "#2A2238" },
    light: { contour: "#9D7421", ridge: "#E2C893" },
  },
  littoral: {
    amplitude: 1.1,
    dark: { contour: "#8AA8C8", ridge: "#172A3A" },
    light: { contour: "#4A6A8A", ridge: "#C8D8E4" },
  },
  urban: {
    amplitude: 1.6,
    dark: { contour: "#C8962E", ridge: "#1F2A55" },
    light: { contour: "#8C631B", ridge: "#D6DAE4" },
  },
  contested: {
    amplitude: 4.4,
    dark: { contour: "#C8962E", ridge: "#26283A" },
    light: { contour: "#8C631B", ridge: "#D2C5A8" },
  },
};

const DEFAULT_TUNING: EnvelopeTuning = {
  amplitude: 3.0,
  dark: { contour: "#C8962E", ridge: "#1B244A" },
  light: { contour: "#8C631B", ridge: "#D8C49B" },
};

export function EnvelopeTerrainScene({
  fallback,
  className,
  envelope,
}: EnvelopeTerrainSceneProps) {
  const palette = useThemeColors();
  const isLight = palette.ink === "#F5F5F0";
  const tuning = TUNING[envelope] ?? DEFAULT_TUNING;
  const themed = isLight ? tuning.light : tuning.dark;

  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      // Keyed so the canvas remounts on envelope change AND theme change -
      // keeps shader uniforms clean when palette flips.
      key={`${envelope}-${isLight ? "light" : "dark"}`}
      frameloop="always"
      camera={{ position: [0, 5, 14], fov: 38 }}
      ariaLabel={`Three-dimensional terrain visualization for ${envelope} envelope`}
    >
      <TerrainMesh
        size={50}
        segments={180}
        amplitude={tuning.amplitude}
        contourSpacing={0.5}
        valleyColor={palette.terrain.valley}
        ridgeColor={themed.ridge}
        contourColor={themed.contour}
        animate={false}
      />
    </CanvasShell>
  );
}

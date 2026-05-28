"use client";

import { type ReactNode } from "react";
import { CanvasShell } from "./CanvasShell";
import { CitySkyline } from "./CitySkyline";
import { useThemeColors } from "@/lib/useThemeColors";

interface HyderabadSkylineSceneProps {
  fallback: ReactNode;
  className?: string;
}

/**
 * Hyderabad anchor section gets a subtle silhouette band that drifts slowly
 * behind the coordinate strip and headline. The urban-industrial photograph
 * remains the foreground; this layer adds quiet implied built environment
 * without competing for attention. In dark mode the buildings sit just below
 * the ink baseline; in light mode they're a pale grey, still darker than
 * cream but soft.
 */
export function HyderabadSkylineScene({
  fallback,
  className,
}: HyderabadSkylineSceneProps) {
  const palette = useThemeColors();
  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 2.4, 20], fov: 24 }}
      ariaLabel="Hyderabad skyline silhouette"
    >
      <CitySkyline
        count={140}
        width={90}
        color={palette.citySilhouette}
        driftSpeed={0.18}
      />
    </CanvasShell>
  );
}

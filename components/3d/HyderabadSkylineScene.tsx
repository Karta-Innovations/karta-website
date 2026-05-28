"use client";

import { type ReactNode } from "react";
import { CanvasShell } from "./CanvasShell";
import { CitySkyline } from "./CitySkyline";

interface HyderabadSkylineSceneProps {
  fallback: ReactNode;
  className?: string;
}

/**
 * Hyderabad anchor section gets a subtle near-black silhouette band that
 * drifts slowly behind the coordinate strip and headline. The urban-industrial
 * photograph remains the foreground; this layer adds quiet implied built
 * environment without competing for attention.
 */
export function HyderabadSkylineScene({
  fallback,
  className,
}: HyderabadSkylineSceneProps) {
  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 2.4, 20], fov: 24 }}
      ariaLabel="Hyderabad skyline silhouette"
    >
      <CitySkyline count={140} width={90} color="#06091B" driftSpeed={0.18} />
    </CanvasShell>
  );
}

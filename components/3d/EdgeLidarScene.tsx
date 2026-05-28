"use client";

import { type ReactNode } from "react";
import { CanvasShell } from "./CanvasShell";
import { PointCloud } from "./PointCloud";

interface EdgeLidarSceneProps {
  fallback: ReactNode;
  className?: string;
}

/**
 * The SkyAnchor edge layer ships a vehicle-side LiDAR/VIO fusion. This scene
 * renders a slowly rotating point cloud that reads as a live return — paired
 * with the existing posture readout text below, the card becomes a small
 * instrument panel rather than a static stat block.
 */
export function EdgeLidarScene({ fallback, className }: EdgeLidarSceneProps) {
  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 0.4, 6], fov: 38 }}
      ariaLabel="LiDAR point cloud visualization"
    >
      <PointCloud count={2400} radius={2.4} pointSize={2.4} color="#C8962E" />
    </CanvasShell>
  );
}

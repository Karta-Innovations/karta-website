"use client";

import { type ReactNode } from "react";
import { CanvasShell } from "./CanvasShell";
import { TerrainMesh } from "./TerrainMesh";

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
  contour: string;
  ridge: string;
}

const TUNING: Record<string, EnvelopeTuning> = {
  highaltitude: { amplitude: 5.2, contour: "#C8962E", ridge: "#1B244A" },
  arid: { amplitude: 2.0, contour: "#D8A84F", ridge: "#2A2238" },
  littoral: { amplitude: 1.1, contour: "#8AA8C8", ridge: "#172A3A" },
  urban: { amplitude: 1.6, contour: "#C8962E", ridge: "#1F2A55" },
  contested: { amplitude: 4.4, contour: "#C8962E", ridge: "#26283A" },
};

const DEFAULT_TUNING: EnvelopeTuning = {
  amplitude: 3.0,
  contour: "#C8962E",
  ridge: "#1B244A",
};

export function EnvelopeTerrainScene({
  fallback,
  className,
  envelope,
}: EnvelopeTerrainSceneProps) {
  const tuning = TUNING[envelope] ?? DEFAULT_TUNING;

  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      // Keyed so the canvas remounts on envelope change — keeps the shader uniforms clean.
      key={envelope}
      frameloop="always"
      camera={{ position: [0, 5, 14], fov: 38 }}
      ariaLabel={`Three-dimensional terrain visualization for ${envelope} envelope`}
    >
      <TerrainMesh
        size={50}
        segments={180}
        amplitude={tuning.amplitude}
        contourSpacing={0.5}
        valleyColor="#0B1020"
        ridgeColor={tuning.ridge}
        contourColor={tuning.contour}
        animate={false}
      />
    </CanvasShell>
  );
}

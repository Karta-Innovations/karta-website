"use client";

import { type ReactNode } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { CanvasShell } from "./CanvasShell";
import { WireframeMesh } from "./WireframeMesh";
import { useThemeColors } from "@/lib/useThemeColors";

interface TheatreWireframeSceneProps {
  fallback: ReactNode;
  className?: string;
}

/**
 * The Theatre/Kiksuya layer ships the cross-base doctrine runtime. A wireframe
 * icosahedron represents the topology of doctrine clauses connected across
 * bases - sparse bloom on the edges gives it a soft signal-glow without
 * crossing into consumer-neon territory. Bloom only runs in dark mode (cream
 * surfaces can't host bloom legibly without it looking like haze).
 */
export function TheatreWireframeScene({
  fallback,
  className,
}: TheatreWireframeSceneProps) {
  const palette = useThemeColors();
  // Bloom needs luminance contrast against the surface - on cream there isn't
  // enough headroom for the effect to register cleanly, so disable it there.
  const isLight = palette.ink === "#F5F5F0";

  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      ariaLabel="Doctrine graph wireframe visualization"
    >
      <WireframeMesh
        radius={1.7}
        detail={2}
        color={palette.wireframe}
        spin={{ x: 0.08, y: 0.14, z: 0 }}
        pulse={!isLight}
      />
      {isLight ? null : (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </CanvasShell>
  );
}

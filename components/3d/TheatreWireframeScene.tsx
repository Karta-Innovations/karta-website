"use client";

import { type ReactNode } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { CanvasShell } from "./CanvasShell";
import { WireframeMesh } from "./WireframeMesh";

interface TheatreWireframeSceneProps {
  fallback: ReactNode;
  className?: string;
}

/**
 * The Theatre/Kiksuya layer ships the cross-base doctrine runtime. A wireframe
 * icosahedron represents the topology of doctrine clauses connected across
 * bases — sparse bloom on the edges gives it a soft signal-glow without
 * crossing into consumer-neon territory. Bloom only runs here — see the plan's
 * perf budget; it is the most expensive postprocessing pass we ship.
 */
export function TheatreWireframeScene({
  fallback,
  className,
}: TheatreWireframeSceneProps) {
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
        color="#C8962E"
        spin={{ x: 0.08, y: 0.14, z: 0 }}
        pulse
      />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </CanvasShell>
  );
}

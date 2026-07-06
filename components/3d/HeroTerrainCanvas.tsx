"use client";

import { useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import type { MotionValue } from "framer-motion";
import { CanvasShell } from "./CanvasShell";
import { TerrainMesh } from "./TerrainMesh";
import { useThemeColors } from "@/lib/useThemeColors";

interface HeroTerrainCanvasProps {
  scrollYProgress: MotionValue<number>;
  /** Position-confidence signal (1 locked, 0 lost) forwarded to the terrain shader. */
  confidence?: MotionValue<number>;
  fallback: ReactNode;
}

export function HeroTerrainCanvas({
  scrollYProgress,
  confidence,
  fallback,
}: HeroTerrainCanvasProps) {
  // Dark-only site: useThemeColors returns the constant dark palette that
  // mirrors the CSS tokens (shaders need hex strings, not CSS vars).
  const palette = useThemeColors();

  return (
    <CanvasShell
      className="absolute inset-0"
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 7, 18], fov: 42 }}
      ariaLabel="Three-dimensional terrain visualization of GPS-denied operating envelope"
    >
      <SceneAtmosphere fogColor={palette.terrain.fog} />
      <CameraDolly progress={scrollYProgress} />
      <TerrainMesh
        size={70}
        segments={240}
        amplitude={4.2}
        contourSpacing={0.45}
        valleyColor={palette.terrain.valley}
        ridgeColor={palette.terrain.ridge}
        contourColor={palette.terrain.contour}
        animate
        confidence={confidence}
      />
    </CanvasShell>
  );
}

function SceneAtmosphere({ fogColor }: { fogColor: string | null }) {
  // Declarative R3F fog: attaches to scene.fog and is cleaned up automatically
  // on unmount, so we never imperatively mutate the scene from a hook.
  if (!fogColor) return null;
  return <fog attach="fog" args={[fogColor, 14, 38]} />;
}

/**
 * Drives a slow camera dolly + tilt against the section's scroll progress.
 *
 * The values are lerped (rather than snapped) in useFrame so that during
 * Lenis's eased scroll the camera glides smoothly even when the scroll
 * MotionValue jitters frame-to-frame.
 */
/* eslint-disable react-hooks/immutability -- R3F drives the camera imperatively
   each frame in useFrame; assigning camera.position and calling camera.lookAt is
   the supported pattern and has no declarative equivalent for per-frame motion. */
function CameraDolly({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  const target = useRef(new Vector3(0, 0, 0));

  // Start pose (top of hero) and end pose (scrolled past).
  const start = useRef({ pos: new Vector3(0, 7, 18), look: new Vector3(0, 0, 0) });
  const end = useRef({ pos: new Vector3(0, 3.2, 7.5), look: new Vector3(0, -1.5, 0) });

  useFrame(() => {
    const t = MathUtils.clamp(progress.get(), 0, 1);
    // Ease-out so most of the motion happens early in the scroll.
    const eased = 1 - Math.pow(1 - t, 2.6);

    const targetX = MathUtils.lerp(start.current.pos.x, end.current.pos.x, eased);
    const targetY = MathUtils.lerp(start.current.pos.y, end.current.pos.y, eased);
    const targetZ = MathUtils.lerp(start.current.pos.z, end.current.pos.z, eased);
    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.08);

    target.current.set(
      MathUtils.lerp(start.current.look.x, end.current.look.x, eased),
      MathUtils.lerp(start.current.look.y, end.current.look.y, eased),
      MathUtils.lerp(start.current.look.z, end.current.look.z, eased),
    );
    camera.lookAt(target.current);
  });

  return null;
}
/* eslint-enable react-hooks/immutability */

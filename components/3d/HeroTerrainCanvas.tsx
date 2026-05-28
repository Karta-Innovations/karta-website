"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Fog, MathUtils, Vector3 } from "three";
import type { MotionValue } from "framer-motion";
import { CanvasShell } from "./CanvasShell";
import { TerrainMesh } from "./TerrainMesh";

interface HeroTerrainCanvasProps {
  scrollYProgress: MotionValue<number>;
  fallback: ReactNode;
}

export function HeroTerrainCanvas({
  scrollYProgress,
  fallback,
}: HeroTerrainCanvasProps) {
  return (
    <CanvasShell
      className="absolute inset-0"
      fallback={fallback}
      frameloop="always"
      camera={{ position: [0, 7, 18], fov: 42 }}
      ariaLabel="Three-dimensional terrain visualization of GPS-denied operating envelope"
    >
      <SceneAtmosphere />
      <CameraDolly progress={scrollYProgress} />
      <TerrainMesh
        size={70}
        segments={240}
        amplitude={4.2}
        contourSpacing={0.45}
        valleyColor="#0B1020"
        ridgeColor="#1B244A"
        contourColor="#C8962E"
        animate
      />
    </CanvasShell>
  );
}

function SceneAtmosphere() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new Fog("#0B1020", 14, 38);
    return () => {
      scene.fog = null;
    };
  }, [scene]);
  return null;
}

/**
 * Drives a slow camera dolly + tilt against the section's scroll progress.
 *
 * The values are lerped (rather than snapped) in useFrame so that during
 * Lenis's eased scroll the camera glides smoothly even when the scroll
 * MotionValue jitters frame-to-frame.
 */
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

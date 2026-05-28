"use client";

import { Suspense, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { CanvasShell } from "./CanvasShell";

interface VehicleModelInnerProps {
  modelUrl: string;
  fallback: ReactNode;
  className?: string;
}

/**
 * Internal — only loaded after the HEAD probe in VehicleModelScene confirms
 * the .glb file actually exists. Three small lights (key, fill, amber rim)
 * give the airframe enough form without going full studio render.
 */
export function VehicleModelInner({
  modelUrl,
  fallback,
  className,
}: VehicleModelInnerProps) {
  return (
    <CanvasShell
      className={className}
      fallback={fallback}
      frameloop="always"
      camera={{ position: [3.2, 1.6, 4.2], fov: 32 }}
      ariaLabel="Three-dimensional model of platform"
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#C8962E" />
      <Suspense fallback={null}>
        <VehicleModel url={modelUrl} />
      </Suspense>
    </CanvasShell>
  );
}

function VehicleModel({ url }: { url: string }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

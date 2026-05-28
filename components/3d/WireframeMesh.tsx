"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type Mesh } from "three";

interface WireframeMeshProps {
  /** World-space radius. Default 1.6. */
  radius?: number;
  /** Geodesic detail level (0-5). Higher = more edges. Default 2. */
  detail?: number;
  /** Edge color. Default Karta amber. */
  color?: string;
  /** Rotation speed (rad/s) on each axis. */
  spin?: { x?: number; y?: number; z?: number };
  /** Pulse the edge brightness. Default true. */
  pulse?: boolean;
}

/**
 * Wireframe geodesic - used by the Theatre/Kiksuya card to suggest a doctrine
 * graph as a topological structure. Renders as a single icosahedron with
 * `wireframe: true` and an emissive material; the surrounding bloom in the
 * scene gives it the soft glow.
 */
export function WireframeMesh({
  radius = 1.6,
  detail = 2,
  color = "#C8962E",
  spin = { x: 0.12, y: 0.18, z: 0 },
  pulse = true,
}: WireframeMeshProps) {
  const ref = useRef<Mesh>(null);
  const colorObj = useRef(new Color(color));

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.x += (spin.x ?? 0) * delta;
    mesh.rotation.y += (spin.y ?? 0) * delta;
    mesh.rotation.z += (spin.z ?? 0) * delta;
    if (pulse) {
      const t = state.clock.elapsedTime;
      const intensity = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.1));
      // Material is MeshBasicMaterial (no lighting); modulate its color directly.
      const mat = mesh.material as { color?: Color };
      if (mat.color) {
        mat.color.copy(colorObj.current).multiplyScalar(intensity);
      }
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[radius, detail]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

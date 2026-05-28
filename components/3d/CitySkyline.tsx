"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type InstancedMesh, Matrix4, Object3D } from "three";

interface CitySkylineProps {
  /** Number of building instances. Default 120. */
  count?: number;
  /** Width of the silhouette band in world units. Default 80. */
  width?: number;
  /** Building color. Default near-black to read as silhouette against ink. */
  color?: string;
  /** Slow horizontal drift speed in world units per second. Default 0.18. */
  driftSpeed?: number;
}

/**
 * Procedural city silhouette — a band of instanced boxes at varied widths
 * and heights. Used behind the Hyderabad operational anchor as a subtle
 * parallax suggestion of a built environment; pairs with the urban-industrial
 * photograph in the foreground rather than competing with it.
 */
export function CitySkyline({
  count = 120,
  width = 80,
  color = "#06091B",
  driftSpeed = 0.18,
}: CitySkylineProps) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useRef(new Object3D());
  const offset = useRef(0);

  // Pre-compute building dimensions once.
  const buildings = useMemo(() => {
    const list: { w: number; h: number; d: number; x: number; baseY: number }[] = [];
    let x = -width / 2;
    while (x < width / 2 && list.length < count) {
      const w = 0.6 + Math.random() * 2.4;
      // Power-distributed height — most short, a few tall.
      const h = 0.4 + Math.pow(Math.random(), 1.8) * 6;
      const d = 1 + Math.random() * 2;
      list.push({ w, h, d, x: x + w / 2, baseY: 0 });
      x += w + Math.random() * 0.3;
    }
    return list;
  }, [count, width]);

  const colorObj = useMemo(() => new Color(color), [color]);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    offset.current += delta * driftSpeed;
    // Reset offset to avoid floating-point drift over long sessions.
    if (offset.current > width) offset.current -= width;

    buildings.forEach((b, i) => {
      // Wrap horizontally for an endless silhouette feel.
      let x = b.x - offset.current;
      while (x < -width / 2) x += width;
      while (x > width / 2) x -= width;

      dummy.current.position.set(x, b.baseY + b.h / 2, 0);
      dummy.current.scale.set(b.w, b.h, b.d);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, buildings.length]}
      castShadow={false}
      receiveShadow={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={colorObj} />
    </instancedMesh>
  );
}

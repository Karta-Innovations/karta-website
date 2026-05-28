"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { hasVehicleModel } from "@/lib/3d-assets";
import type { Vehicle } from "@/lib/catalog";

interface VehicleModelSceneProps {
  /** Vehicle slug. The scene mounts only if the slug is listed in lib/3d-assets.ts. */
  slug: Vehicle["slug"];
  /** Static fallback rendered when WebGL is gated or the model is not enabled. */
  fallback: ReactNode;
  className?: string;
}

// Inner is dynamic-imported so drei/useGLTF only enters the bundle when a
// vehicle has been opted in to 3D via the allowlist in lib/3d-assets.ts.
const VehicleModelInner = dynamic(
  () =>
    import("./VehicleModelScene.inner").then((m) => m.VehicleModelInner),
  { ssr: false, loading: () => null },
);

export function VehicleModelScene({
  slug,
  fallback,
  className,
}: VehicleModelSceneProps) {
  if (!hasVehicleModel(slug)) return null;
  return (
    <VehicleModelInner
      modelUrl={`/models/${slug}.glb`}
      fallback={fallback}
      className={className}
    />
  );
}

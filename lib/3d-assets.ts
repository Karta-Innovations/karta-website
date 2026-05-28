/**
 * Registry of vehicle slugs that have a corresponding .glb model dropped at
 * `public/models/{slug}.glb`. The Vehicles section reads this allowlist
 * to decide whether to mount the 3D scene; sections for slugs not in the
 * list continue to render only the existing JPG photography.
 *
 * To enable a vehicle's 3D scene:
 *   1. Drop the .glb file at `public/models/{slug}.glb` (Draco-compressed,
 *      ≤ 500 KB, ≤ 50k triangles, single material).
 *   2. Add the slug to the array below.
 *
 * Removing a slug is also safe — the scene mounts conditionally.
 */
import type { Vehicle } from "./catalog";

export const VEHICLES_WITH_3D_MODEL: ReadonlyArray<Vehicle["slug"]> = [
  // "kari",
  // "cerana",
  // "dorsata",
];

export function hasVehicleModel(slug: Vehicle["slug"]): boolean {
  return VEHICLES_WITH_3D_MODEL.includes(slug);
}

"use client";

import { Canvas } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type FrameloopMode = "always" | "demand" | "never";

interface CanvasShellProps {
  /** R3F scene graph. Wrap async children (useGLTF, useTexture) in Suspense yourself if you need custom fallback. */
  children: ReactNode;
  /** Rendered when WebGL is unavailable, prefers-reduced-motion is set, or the canvas is gated off. */
  fallback: ReactNode;
  /** Outer wrapper className - set the canvas dimensions here to reserve layout space and avoid CLS. */
  className?: string;
  /**
   * Frame loop strategy. Default "always" - most Karta scenes have internal animation (rotation, pulse).
   * Use "demand" for purely scroll-driven scenes where GSAP triggers invalidate().
   * When the canvas is off-screen, the loop is forced to "never" regardless of this setting.
   */
  frameloop?: FrameloopMode;
  /** Suspend the frame loop when scrolled out of view. Default true. */
  suspendOffscreen?: boolean;
  /** Initial camera. */
  camera?: { position?: [number, number, number]; fov?: number };
  /** Optional aria label for the canvas region. */
  ariaLabel?: string;
}

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

// Client capability gate, probed once and cached. The server snapshot is false,
// so SSR and the first hydration render show the static fallback (matching what
// shipped before 3D); the canvas mounts only after hydration on a capable client.
let capabilityCache: boolean | null = null;
function getCapability(): boolean {
  if (capabilityCache === null) {
    capabilityCache = !isReducedMotion() && hasWebGL();
  }
  return capabilityCache;
}
const subscribeCapability = () => () => {};
const getServerCapability = () => false;

/**
 * Karta's gated R3F Canvas wrapper.
 *
 * Why this exists: the site has a strict bundle budget and an accessibility floor
 * (prefers-reduced-motion already disables Lenis and CSS animations - 3D must respect
 * the same contract). Consumers always pass a static fallback so visitors without
 * WebGL, on low-power devices, or with reduced motion preferences see the same
 * imagery the site shipped before this upgrade.
 *
 * Consumers should dynamic-import this component with `ssr: false` so the
 * three/R3F bundle never reaches the initial JS payload.
 */
export function CanvasShell({
  children,
  fallback,
  className,
  frameloop = "always",
  suspendOffscreen = true,
  camera,
  ariaLabel,
}: CanvasShellProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeCapability,
    getCapability,
    getServerCapability,
  );
  const [inView, setInView] = useState(!suspendOffscreen);

  useEffect(() => {
    if (!enabled || !suspendOffscreen) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled, suspendOffscreen]);

  if (!enabled) {
    return (
      <div ref={wrapperRef} className={className} aria-label={ariaLabel}>
        {fallback}
      </div>
    );
  }

  const effectiveFrameloop: FrameloopMode = inView ? frameloop : "never";

  return (
    <div ref={wrapperRef} className={className} aria-label={ariaLabel}>
      <Canvas
        frameloop={effectiveFrameloop}
        camera={camera}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

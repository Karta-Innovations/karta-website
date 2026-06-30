"use client";

import { type RefObject } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Dynamic-import the actual canvas so three/R3F never reaches the initial bundle.
// The fallback below keeps a static atmospheric layer for visitors without WebGL
// or with prefers-reduced-motion set.
const HeroTerrainCanvas = dynamic(
  () => import("./HeroTerrainCanvas").then((m) => m.HeroTerrainCanvas),
  {
    ssr: false,
    loading: () => <TerrainFallback imageY={null} imageScale={null} />,
  },
);

interface HeroTerrainProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function HeroTerrain({ sectionRef }: HeroTerrainProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <HeroTerrainCanvas
      scrollYProgress={scrollYProgress}
      fallback={<TerrainFallback imageY={imageY} imageScale={imageScale} />}
    />
  );
}

// Static, on-brand fallback for no-WebGL / reduced-motion / pre-hydration: a soft
// atmospheric gradient with the aurora wash and hairline grid, standing in for
// the 3D terrain. No image asset, so it can never 404.
function TerrainFallback({
  imageY,
  imageScale,
}: {
  imageY: MotionValue<string> | null;
  imageScale: MotionValue<number> | null;
}) {
  const style =
    imageY && imageScale ? { y: imageY, scale: imageScale } : undefined;
  return (
    <motion.div
      style={style}
      aria-hidden
      className="absolute inset-0 will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo via-ink-2 to-ink" />
      <div className="bg-aurora absolute inset-0 opacity-60" />
      <div className="grid-overlay absolute inset-0 opacity-50" />
    </motion.div>
  );
}

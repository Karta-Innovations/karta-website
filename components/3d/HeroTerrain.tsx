"use client";

import { type RefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Dynamic-import the actual canvas so three/R3F never reaches the initial bundle.
// The fallback below mirrors the previous static parallax so visitors without WebGL
// (or with prefers-reduced-motion set) see exactly the imagery the site shipped before.
const HeroTerrainCanvas = dynamic(
  () => import("./HeroTerrainCanvas").then((m) => m.HeroTerrainCanvas),
  {
    ssr: false,
    loading: () => <HimalayaFallback imageY={null} imageScale={null} />,
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
      fallback={<HimalayaFallback imageY={imageY} imageScale={imageScale} />}
    />
  );
}

function HimalayaFallback({
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
      className="absolute inset-0 will-change-transform"
    >
      <Image
        src="/imagery/himalaya.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={92}
      />
    </motion.div>
  );
}

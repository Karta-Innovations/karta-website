"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/cn";

interface ScrollFillProps {
  text: string;
  as?: ElementType;
  className?: string;
}

/**
 * A statement that inks itself in, word by word, as it is scrolled through.
 * The words are always present and readable; only their weight on the page
 * changes. Reduced-motion visitors get it fully inked (see the stylesheet).
 */
export function ScrollFill({ text, as: Tag = "p", className }: ScrollFillProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.42"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    ref.current?.style.setProperty("--p", value.toFixed(4));
  });

  return (
    <Tag ref={ref} className={cn("fill", className)} style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, index) => (
        <span key={index} style={{ "--i": index } as CSSProperties}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

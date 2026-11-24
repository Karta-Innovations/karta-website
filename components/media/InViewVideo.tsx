"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface InViewVideoProps {
  src: string;
  poster: string;
  /** A second encode for narrow screens, with its own poster. */
  narrow?: { src: string; poster: string };
  /** Accessible description of what the footage shows. */
  label: string;
  className?: string;
  /** Loop the clip. Turn off for one-shot reveals that hold their last frame. */
  loop?: boolean;
  /** Where the play/pause control sits. */
  control?: "top" | "bottom" | "none";
  children?: ReactNode;
}

/**
 * Muted footage that plays only while on screen.
 *
 * - Pauses off-screen and when the tab is hidden; a manual pause sticks.
 * - Reduced-motion visitors start on the poster and opt in with the control.
 * - The control is always there, so the clip is operable by keyboard.
 */
export function InViewVideo({
  src,
  poster,
  narrow,
  label,
  className,
  loop = true,
  control = "bottom",
  children,
}: InViewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  // Wait for the viewport before choosing an encode, so only one file is fetched.
  const isNarrow = useMediaQuery("(max-width: 720px)");
  const source = isNarrow === null ? null : narrow && isNarrow ? narrow : { src, poster };
  const activeSrc = source?.src ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      const wantsPlay = visible && !document.hidden && !motion.matches && !manuallyPaused.current;
      if (wantsPlay) {
        if (video.paused && !(video.ended && !loop)) void video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      video.pause();
    };
  }, [activeSrc, loop]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      if (video.ended) video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  }

  return (
    <div className={cn("media", className)}>
      <video
        ref={videoRef}
        key={activeSrc ?? "pending"}
        muted
        loop={loop}
        playsInline
        preload="metadata"
        poster={source?.poster ?? poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {source ? <source src={source.src} type="video/mp4" /> : null}
      </video>
      {children}
      {control === "none" ? null : (
        <button
          type="button"
          className={cn("media__control", control === "top" && "media__control--top")}
          onClick={toggle}
          aria-label={playing ? "Pause footage" : "Play footage"}
        >
          {playing ? <Pause size={11} weight="fill" aria-hidden /> : <Play size={11} weight="fill" aria-hidden />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}

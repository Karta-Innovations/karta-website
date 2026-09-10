"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden && !motion.matches && !manuallyPaused.current) {
        void video.play().catch(() => { /* The play button remains available. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      syncPlayback();
    }, { threshold: [0, 0.35], rootMargin: "-88px 0px 0px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPaused.current = false;
      void video.play().catch(() => {});
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  }

  return (
    <figure className="launch-video">
      <div className="launch-video__frame">
        <video ref={videoRef} width={1280} height={534} muted loop playsInline
          preload="metadata" poster="/media/skyanchor-autonomy-poster.jpg"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          aria-label="SkyAnchor integration concept: one module across multiple aircraft; airframe-specific integration required">
          <source src="/media/skyanchor-autonomy-concept.mp4" type="video/mp4" />
        </video>
        <button type="button" className="launch-video__control" onClick={togglePlayback}
          aria-label={playing ? "Pause SkyAnchor video" : "Play SkyAnchor video"}>
          {playing ? <Pause size={17} weight="fill" aria-hidden /> : <Play size={17} weight="fill" aria-hidden />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      </div>
    </figure>
  );
}

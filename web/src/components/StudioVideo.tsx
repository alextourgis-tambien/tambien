"use client";
import { useEffect, useRef, useState } from "react";
export const temporaryStudioVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1059541602/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&signature=0352dc43b45db1b7622b0dd94ee7529b57700757664b047322d773d29fbbb4e6";
export function StudioVideo({
  url,
  poster,
  label,
}: {
  url?: string;
  poster?: string;
  label: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    if (motion.matches) void video.current?.play().catch(() => {});
    let frame = 0;
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!wrapper.current) return;
        const top = wrapper.current.getBoundingClientRect().top;
        const offset = motion.matches
          ? Math.max(-55, Math.min(0, (top - innerHeight * 0.45) * 0.1))
          : 0;
        if (video.current)
          video.current.style.transform = `translateY(${offset}px)`;
      });
    };
    addEventListener("scroll", scroll, { passive: true });
    return () => {
      removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const start = () => {
    const node = video.current;
    if (!node) return;
    node.currentTime = 0;
    node.muted = false;
    setFull(true);
    void node.play().catch(() => {});
  };
  return (
    <div ref={wrapper} className="studio-video">
      <video
        ref={video}
        src={url || temporaryStudioVideo}
        poster={poster}
        muted={!full}
        playsInline
        controls={full}
        preload="metadata"
        onError={() => setFailed(true)}
        onTimeUpdate={() => {
          if (!full && video.current && video.current.currentTime >= 10)
            video.current.currentTime = 0;
        }}
        onEnded={() => {
          setFull(false);
          if (video.current) {
            video.current.muted = true;
            video.current.currentTime = 0;
            void video.current.play().catch(() => {});
          }
        }}
      />
      {!full ? (
        <button className="video-start" aria-label={label} onClick={start}>
          <span>{label} ↗</span>
        </button>
      ) : null}
      {failed ? (
        <a className="video-error" href={url || temporaryStudioVideo}>
          {label} ↗
        </a>
      ) : null}
    </div>
  );
}

"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
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
  const cue = useRef<HTMLSpanElement>(null);
  const cursorMotion = useRef<MediaQueryList | null>(null);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, frame: 0 });
  const [full, setFull] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    cursorMotion.current = matchMedia(
      "(min-width: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (motion.matches) void video.current?.play().catch(() => {});
    let frame = 0;
    let offset = 0;
    let target = 0;
    let dirty = true;
    const tick = () => {
      const node = wrapper.current;
      if (!node) return;
      if (dirty) {
        // Measure the stationary slot so the transform never feeds back into itself.
        const top = node.parentElement!.getBoundingClientRect().top;
        target = motion.matches
          ? Math.max(-64, Math.min(24, (top - innerHeight * 0.45) * 0.16))
          : 0;
        dirty = false;
      }
      offset += (target - offset) * 0.16;
      if (Math.abs(target - offset) < 0.1) offset = target;
      node.style.transform = `translate3d(0,${offset}px,0)`;
      frame = offset !== target ? requestAnimationFrame(tick) : 0;
    };
    const scroll = () => {
      dirty = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    scroll();
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    motion.addEventListener("change", scroll);
    const pointerState = pointer.current;
    return () => {
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      motion.removeEventListener("change", scroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerState.frame);
    };
  }, []);
  const hideCue = () => {
    if (cue.current) cue.current.dataset.visible = "false";
    cancelAnimationFrame(pointer.current.frame);
    pointer.current.frame = 0;
  };
  const moveCue = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !cue.current ||
      !cursorMotion.current?.matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const state = pointer.current;
    state.targetX = Math.max(
      40,
      Math.min(bounds.width - 40, event.clientX - bounds.left),
    );
    state.targetY = Math.max(
      22,
      Math.min(bounds.height - 22, event.clientY - bounds.top),
    );
    if (cue.current.dataset.visible !== "true") {
      state.x = state.targetX;
      state.y = state.targetY;
    }
    cue.current.dataset.visible = "true";
    const tick = () => {
      state.x += (state.targetX - state.x) * 0.2;
      state.y += (state.targetY - state.y) * 0.2;
      if (cue.current)
        cue.current.style.transform = `translate3d(${state.x}px,${state.y}px,0) translate(-50%,-50%)`;
      state.frame =
        Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y) >
        0.1
          ? requestAnimationFrame(tick)
          : 0;
    };
    if (!state.frame) state.frame = requestAnimationFrame(tick);
  };
  const start = () => {
    const node = video.current;
    if (!node) return;
    hideCue();
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
        <button
          className="video-start"
          aria-label={label}
          onClick={start}
          onPointerEnter={moveCue}
          onPointerMove={moveCue}
          onPointerLeave={hideCue}
          onBlur={hideCue}
        >
          <span
            ref={cue}
            className="video-play-cue"
            data-visible="false"
            aria-hidden="true"
          >
            <span className="play-icon">▶</span> Play
          </span>
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

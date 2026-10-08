"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Native scroll, one measurement per frame, no continuous animation loop. */
export function FeedParallax({ children }: { children: ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = grid.current;
    if (!node) return;
    const columns = Array.from(node.querySelectorAll<HTMLElement>(":scope > .feed-column"));
    const media = matchMedia("(min-width: 1001px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const speeds = [0.06, 0.14, 0.09, 0.18];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches) {
        columns.forEach((column) => column.style.removeProperty("transform"));
        return;
      }
      const bounds = node.getBoundingClientRect();
      // Start only when the grid reaches the top; the grid itself stays stationary.
      const progress = Math.max(0, Math.min(bounds.height, -bounds.top));
      columns.forEach((column, index) => {
        const offset = -Math.min(320, progress * speeds[index]);
        column.style.transform = `translate3d(0,${offset}px,0)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      columns.forEach((column) => column.style.removeProperty("transform"));
    };
  }, []);
  return <div ref={grid} className="feed-grid">{children}</div>;
}

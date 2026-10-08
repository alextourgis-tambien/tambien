"use client";
import { ViewTransition, useEffect, useRef, type ReactNode } from "react";
/** Native, opacity-only route transition; no scroll interception or animation loop. */
export function PageFade({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    // Keep the animation library out of the touch/reduced-motion interaction path.
    if (
      !matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    void import("./setupHoverMotion").then(({ setupHoverMotion }) => {
      if (!cancelled && root.current) cleanup = setupHoverMotion(root.current);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return (
    <ViewTransition default="none" enter="page-fade" exit="page-fade">
      <div ref={root} className="transition-page">
        {children}
      </div>
    </ViewTransition>
  );
}

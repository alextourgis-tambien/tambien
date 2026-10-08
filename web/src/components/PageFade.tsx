"use client";
import { ViewTransition, type ReactNode } from "react";
/** Native, opacity-only route transition; no scroll interception or animation loop. */
export function PageFade({ children }: { children: ReactNode }) {
  return (
    <ViewTransition default="none" enter="page-fade" exit="page-fade">
      <div className="transition-page">{children}</div>
    </ViewTransition>
  );
}

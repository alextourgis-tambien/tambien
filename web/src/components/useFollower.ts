"use client";
import { useEffect, useRef, type PointerEvent } from "react";
export function useFollower<T extends HTMLElement>() {
  const area = useRef<HTMLElement>(null);
  const follower = useRef<T>(null);
  const wake = useRef<() => void>(() => {});
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let x = 0,
      y = 0;
    const tick = () => {
      x += (target.current.x - x) * 0.12;
      y += (target.current.y - y) * 0.12;
      if (follower.current)
        follower.current.style.transform = query.matches
          ? `translate3d(${x}px,${y}px,0)`
          : "";
      frame =
        Math.abs(target.current.x - x) + Math.abs(target.current.y - y) > 0.2 &&
        query.matches
          ? requestAnimationFrame(tick)
          : 0;
    };
    wake.current = () => {
      if (!frame && query.matches) frame = requestAnimationFrame(tick);
    };
    return () => cancelAnimationFrame(frame);
  }, []);
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !area.current || !follower.current)
      return;
    // Keep a hovered or keyboard-focused contact link still so it remains clickable.
    if (
      follower.current.contains(event.target as Node) ||
      follower.current === document.activeElement
    )
      return;
    const bounds = area.current.getBoundingClientRect();
    const node = follower.current;
    let left = node.offsetLeft,
      top = node.offsetTop;
    let parent = node.offsetParent as HTMLElement | null;
    while (parent && parent !== area.current) {
      left += parent.offsetLeft;
      top += parent.offsetTop;
      parent = parent.offsetParent as HTMLElement | null;
    }
    target.current = {
      x:
        Math.max(
          0,
          Math.min(
            bounds.width - node.offsetWidth,
            event.clientX - bounds.left + 24,
          ),
        ) - left,
      y:
        Math.max(
          0,
          Math.min(
            bounds.height - node.offsetHeight,
            event.clientY - bounds.top + 24,
          ),
        ) - top,
    };
    wake.current();
  };
  return {
    area,
    follower,
    move,
    reset: () => {
      target.current = { x: 0, y: 0 };
      wake.current();
    },
  };
}

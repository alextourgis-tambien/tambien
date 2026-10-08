"use client";
import { useEffect, useRef, type PointerEvent } from "react";
export function useFollower<T extends HTMLElement>({
  trackOnArrival = false,
  allowVerticalOverflow = false,
}: { trackOnArrival?: boolean; allowVerticalOverflow?: boolean } = {}) {
  const area = useRef<HTMLElement>(null);
  const follower = useRef<T>(null);
  const wake = useRef<() => void>(() => {});
  const target = useRef({ x: 0, y: 0 });
  const position = (clientX: number, clientY: number) => {
    if (
      !area.current ||
      !follower.current ||
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
          Math.min(bounds.width - node.offsetWidth, clientX - bounds.left + 24),
        ) - left,
      y:
        Math.max(
          0,
          Math.min(
            allowVerticalOverflow ? Infinity : bounds.height - node.offsetHeight,
            clientY - bounds.top + 24,
          ),
        ) - top,
    };
    wake.current();
  };
  const updatePosition = useRef(position);
  useEffect(() => {
    updatePosition.current = position;
  });
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let x = 0,
      y = 0;
    const tick = () => {
      if (trackOnArrival && follower.current === document.activeElement) {
        frame = 0;
        return;
      }
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
    if (!trackOnArrival) return () => cancelAnimationFrame(frame);
    const latestPointer = { x: innerWidth / 2, y: innerHeight / 2 };
    let visible = false;
    let justEntered = false;
    let syncFrame = 0;
    const sync = () => {
      if (!visible || !query.matches || syncFrame) return;
      syncFrame = requestAnimationFrame(() => {
        syncFrame = 0;
        if (
          justEntered ||
          !follower.current?.matches(":hover, :focus-visible")
        ) {
          updatePosition.current(latestPointer.x, latestPointer.y);
        }
        justEntered = false;
      });
    };
    const rememberPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      latestPointer.x = event.clientX;
      latestPointer.y = event.clientY;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        justEntered = entry.isIntersecting && !visible;
        visible = entry.isIntersecting;
        if (visible) sync();
      },
      { threshold: 0.05 },
    );
    if (area.current) observer.observe(area.current);
    // Track the last mouse position before the section arrives beneath it.
    addEventListener("pointermove", rememberPointer, { passive: true });
    addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    query.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      removeEventListener("pointermove", rememberPointer);
      removeEventListener("scroll", sync);
      removeEventListener("resize", sync);
      query.removeEventListener("change", sync);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(syncFrame);
    };
  }, [trackOnArrival]);
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !area.current || !follower.current)
      return;
    // Keep a hovered or keyboard-focused contact link still so it remains clickable.
    if (
      follower.current.contains(event.target as Node) ||
      follower.current === document.activeElement
    )
      return;
    position(event.clientX, event.clientY);
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

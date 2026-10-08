import { gsap } from "gsap";

/** Only transforms/opacity, no pointer-move listeners or scroll interception. */
export function setupHoverMotion(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const removeListeners: (() => void)[] = [];
      const bind = (element: HTMLElement, timeline: gsap.core.Timeline) => {
        const enter = () => timeline.play();
        const leave = () => {
          if (!element.matches(":hover, :focus-visible")) timeline.reverse();
        };
        element.addEventListener("mouseenter", enter);
        element.addEventListener("mouseleave", leave);
        element.addEventListener("focus", enter);
        element.addEventListener("blur", leave);
        if (element.matches(":hover, :focus-visible")) timeline.play();
        removeListeners.push(() => {
          element.removeEventListener("mouseenter", enter);
          element.removeEventListener("mouseleave", leave);
          element.removeEventListener("focus", enter);
          element.removeEventListener("blur", leave);
        });
      };
      root.querySelectorAll<HTMLElement>("a, button").forEach((element) => {
        // The menu keeps its own opacity treatment; its labels remain stationary.
        if (element.closest(".menu-panel")) return;
        const label = element.querySelector<HTMLElement>(".hover-label-track");
        if (!label) return;
        const timeline = gsap.timeline({ paused: true });
        timeline.to(label, {
          x: -3,
          duration: 0.35,
          ease: "power2.out",
        });
        const cue = element.querySelector<HTMLElement>(".hover-label-cue");
        if (cue)
          timeline.fromTo(
            cue,
            { opacity: 0, x: -3 },
            { opacity: 0.85, x: 0, duration: 0.3, ease: "power2.out" },
            0.04,
          );
        bind(element, timeline);
      });
      root
        .querySelectorAll<HTMLElement>("[data-motion-card]")
        .forEach((element) => {
          const visual = element.querySelector<HTMLElement>(".motion-visual");
          const cue = element.querySelector<HTMLElement>(".card-cue");
          if (!visual) return;
          const timeline = gsap.timeline({ paused: true });
          timeline.to(visual, {
            scale: 1.035,
            yPercent: -0.9,
            duration: 0.7,
            ease: "power3.out",
          });
          if (cue)
            timeline.fromTo(
              cue,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
              0.12,
            );
          bind(element, timeline);
        });
      return () => removeListeners.forEach((remove) => remove());
    },
    root,
  );
  return () => media.revert();
}

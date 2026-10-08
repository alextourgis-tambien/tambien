/** A stable accessible label and a small decorative directional cue. */
export function HoverLabel({ children }: { children: string }) {
  return (
    <span className="hover-label">
      <span className="hover-label-track">{children}</span>
      <span className="hover-label-cue" aria-hidden="true">
        ↗
      </span>
    </span>
  );
}

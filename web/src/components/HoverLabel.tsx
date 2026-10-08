/** One accessible label, with a decorative copy for the hover reveal. */
export function HoverLabel({ children }: { children: string }) {
  return (
    <span className="hover-label">
      <span className="hover-label-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

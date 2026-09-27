
/**
 * Brand mark: two connected "peers" inside code brackets.
 * `animated` plays the connecting-line draw-in once on mount;
 * with reduced motion, CSS shows the end state immediately.
 */

export function BrandMark({ size = 32, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      className={`c4p-mark${animated ? " is-animated" : ""}`}
      role="img"
      aria-label="Code4Peers"
    >
      <path
        className="c4p-mark__bracket"
        d="M47 30 L20 65 L47 100"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="c4p-mark__bracket"
        d="M83 30 L110 65 L83 100"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        className="c4p-mark__connector"
        x1="52"
        y1="85"
        x2="78"
        y2="45"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle className="c4p-mark__dot" cx="52" cy="85" r="7" />
      <circle className="c4p-mark__dot c4p-mark__dot--delay" cx="78" cy="45" r="7" />
    </svg>
  );
}

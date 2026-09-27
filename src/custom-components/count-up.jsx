import { useState, useEffect } from 'react';

/** Counts a number up from 0 to `target` once `active` becomes true. */
export function CountUp({ target, active, suffix = "" }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const duration = 700;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return (
    <>
      {value}
      {suffix}
    </>
  );
}
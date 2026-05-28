/* ============================================================
   useScrollSkew — Warm Organic Editorial
   Reads scroll velocity and applies a subtle skewY to the element.
   Fast scroll → slight tilt; stops → springs back to flat.
   ============================================================ */
import { useEffect, useRef } from "react";

export function useScrollSkew<T extends HTMLElement>(maxSkew = 4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let currentSkew = 0;
    let raf: number;

    const tick = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;

      // Target skew clamped to ±maxSkew degrees
      const target = Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.06));
      // Lerp toward target
      currentSkew += (target - currentSkew) * 0.1;

      if (Math.abs(currentSkew) > 0.01) {
        el.style.transform = `skewY(${currentSkew.toFixed(3)}deg)`;
      } else {
        el.style.transform = "";
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [maxSkew]);

  return ref;
}

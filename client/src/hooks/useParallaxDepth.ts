/* ============================================================
   useParallaxDepth — Warm Organic Editorial
   Moves an element at `speed` ratio relative to scroll position.
   speed 0 = locked, speed 1 = normal scroll, 0.4 = slow/deep.
   Only active when element is in/near viewport.
   ============================================================ */
import { useEffect, useRef } from "react";

export function useParallaxDepth<T extends HTMLElement>(speed = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only run when element is near viewport
      if (rect.bottom < -vh || rect.top > vh * 2) {
        ticking = false;
        return;
      }

      // Distance from viewport centre
      const centre = rect.top + rect.height / 2 - vh / 2;
      const offset = centre * (speed - 1);

      el.style.transform = `translateY(${offset.toFixed(2)}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

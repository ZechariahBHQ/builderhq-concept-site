/* ============================================================
   useMagneticButton — Warm Organic Editorial
   Pulls a button element toward the cursor when within `radius` px.
   Returns a ref to attach to the element.
   ============================================================ */
import { useEffect, useRef } from "react";

export function useMagneticButton<T extends HTMLElement>(
  strength = 0.62,
  radius = 130
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        // Ease the pull: stronger near centre, gentler at edge
      const ease = Math.pow(1 - dist / radius, 1.4);
      const pull = ease * strength;
      el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      } else {
        el.style.transform = "";
      }
    };

    const onLeave = () => {
      el.style.transition = "transform 500ms cubic-bezier(0.23,1,0.32,1)";
      el.style.transform = "";
      setTimeout(() => {
        if (el) el.style.transition = "";
      }, 520);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return ref;
}

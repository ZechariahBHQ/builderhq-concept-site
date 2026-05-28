/* ============================================================
   useMagneticButton — Warm Organic Editorial
   • Magnetic pull (strength 0.85, radius 180px, eased curve)
   • H: Gravity field glow — soft radial gradient appears as
     cursor approaches, intensifies closer to centre
   Sticky snap (D) removed — felt unnatural on fast movement
   ============================================================ */
import { useEffect, useRef } from "react";

export function useMagneticButton<T extends HTMLElement>(
  strength = 0.85,
  radius = 180
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // ── H: Gravity glow overlay ──
    const glow = document.createElement("div");
    glow.style.cssText = `
      position: absolute;
      inset: -60px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(140,26,26,0.18) 0%, rgba(140,26,26,0) 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 280ms ease, transform 280ms ease;
      z-index: -1;
      transform: scale(0.6);
    `;
    const prevPosition = getComputedStyle(el).position;
    if (prevPosition === "static") el.style.position = "relative";
    el.style.overflow = "visible";
    el.appendChild(glow);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        // Eased pull — stronger near centre, gentler at edge
        const ease = Math.pow(1 - dist / radius, 1.3);
        const pull = ease * strength;
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;

        // H: Glow intensifies as cursor approaches
        const intensity = 1 - dist / radius;
        glow.style.opacity = String(intensity * 0.9);
        glow.style.transform = `scale(${0.6 + intensity * 0.5})`;
      } else {
        el.style.transform = "";
        glow.style.opacity = "0";
        glow.style.transform = "scale(0.6)";
      }
    };

    const onLeave = () => {
      el.style.transition = "transform 550ms cubic-bezier(0.23,1,0.32,1)";
      el.style.transform = "";
      glow.style.opacity = "0";
      glow.style.transform = "scale(0.6)";
      setTimeout(() => { if (el) el.style.transition = ""; }, 570);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (el.contains(glow)) el.removeChild(glow);
      if (prevPosition === "static") el.style.position = "";
    };
  }, [strength, radius]);

  return ref;
}

// Stub kept for compatibility — no-op since snap removed
export function registerCursorElements(_dot: HTMLElement, _ring: HTMLElement) {}

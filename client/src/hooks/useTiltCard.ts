/* ============================================================
   useTiltCard — E: 3D perspective tilt tracking cursor
   Card tilts up to maxTilt degrees on each axis following
   cursor position within the card bounds.
   Inner highlight shifts to simulate a moving light source.
   ============================================================ */
import { useEffect, useRef } from "react";

export function useTiltCard<T extends HTMLElement>(maxTilt = 12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Inject a highlight overlay
    const highlight = document.createElement("div");
    highlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 3;
      opacity: 0;
      transition: opacity 300ms ease;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%);
    `;
    const prevPos = getComputedStyle(el).position;
    if (prevPos === "static") el.style.position = "relative";
    el.appendChild(highlight);

    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform 400ms cubic-bezier(0.23,1,0.32,1)";

    const onEnter = () => {
      highlight.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalise cursor position within card: -1 to +1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      const rotX = -ny * maxTilt;
      const rotY = nx * maxTilt;

      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;

      // Move highlight to follow cursor
      const hx = ((nx + 1) / 2) * 100;
      const hy = ((ny + 1) / 2) * 100;
      highlight.style.background = `radial-gradient(circle at ${hx}% ${hy}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)`;
    };

    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      highlight.style.opacity = "0";
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (el.contains(highlight)) el.removeChild(highlight);
      if (prevPos === "static") el.style.position = "";
    };
  }, [maxTilt]);

  return ref;
}

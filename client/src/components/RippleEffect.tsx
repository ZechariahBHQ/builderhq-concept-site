/* ============================================================
   RippleEffect — F: Click burst ripple from cursor position
   On every click a crimson circle expands from the click point
   and fades out in 420ms. Uses colour inversion same as cursor.
   ============================================================ */
import { useEffect } from "react";

function luminance(cssColor: string): number {
  const m = cssColor.match(/[\d.]+/g);
  if (!m || m.length < 3) return 1;
  const [r, g, b] = m.map(Number);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function resolvedBg(el: Element | null): string {
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    el = el.parentElement;
  }
  return "rgb(247, 232, 216)";
}

export default function RippleEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      const bg = resolvedBg(el);
      const color = luminance(bg) < 0.45 ? "#F7E8D8" : "#8C1A1A";

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${color};
        opacity: 0.7;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%) scale(1);
        transition: transform 420ms cubic-bezier(0.23,1,0.32,1), opacity 420ms ease;
      `;
      document.body.appendChild(ripple);

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ripple.style.transform = "translate(-50%, -50%) scale(18)";
          ripple.style.opacity = "0";
        });
      });

      setTimeout(() => {
        if (document.body.contains(ripple)) document.body.removeChild(ripple);
      }, 440);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

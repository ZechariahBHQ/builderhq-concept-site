/* ============================================================
   CustomCursor — Warm Organic Editorial
   • Dot follows cursor exactly
   • Ring lerps behind with smooth lag
   • Colour inverts: crimson on cream, cream on crimson
   • Ring enlarges on hover over interactive elements
   Sticky snap removed — clean free-follow only
   ============================================================ */
import { useEffect, useRef } from "react";

const CREAM = "#F7E8D8";
const CRIMSON = "#8C1A1A";

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

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;
    let visible = false;
    let currentColor = CRIMSON;

    const setColor = (color: string) => {
      if (color === currentColor) return;
      currentColor = color;
      dot.style.background = color;
      ring.style.borderColor = color;
    };

    dot.style.opacity = "0";
    ring.style.opacity = "0";

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const el = document.elementFromPoint(mx, my) as Element | null;
      const bg = resolvedBg(el);
      setColor(luminance(bg) < 0.45 ? CREAM : CRIMSON);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;

      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      dot.style.transform = "translate(-50%, -50%) scale(0)";
    };

    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const attachAll = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        const h = el as HTMLElement;
        if (!h.dataset.cursorBound) {
          h.dataset.cursorBound = "1";
          h.addEventListener("mouseenter", onEnter);
          h.addEventListener("mouseleave", onLeave);
        }
      });
    };

    attachAll();
    const observer = new MutationObserver(attachAll);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: CRIMSON,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%) scale(1)",
          willChange: "left, top, transform",
          transition:
            "transform 150ms cubic-bezier(0.23,1,0.32,1), background 120ms, opacity 200ms",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${CRIMSON}`,
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          willChange: "left, top, width, height",
          transition:
            "width 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), border-color 120ms, opacity 200ms",
        }}
      />
    </>
  );
}

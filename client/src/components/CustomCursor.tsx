/* ============================================================
   CustomCursor — Warm Organic Editorial
   Uses mix-blend-mode: difference so the cursor automatically
   inverts: cream (#F7E8D8) on crimson sections, crimson on cream.
   MutationObserver re-attaches hover listeners as new DOM mounts.
   ============================================================ */
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf: number;
    let visible = false;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

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
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.13);
      ry = lerp(ry, my, 0.13);

      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      raf = requestAnimationFrame(tick);
    };

    // Expand ring on interactive elements
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
        // Avoid double-attaching
        if (!(el as HTMLElement).dataset.cursorBound) {
          (el as HTMLElement).dataset.cursorBound = "1";
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
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
      {/* Dot — white fill + difference blend = inverts against any bg */}
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
          background: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%) scale(1)",
          mixBlendMode: "difference",
          willChange: "left, top, transform",
          transition: "transform 150ms cubic-bezier(0.23,1,0.32,1), opacity 200ms",
        }}
      />
      {/* Ring — white border + difference blend = inverts against any bg */}
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
          border: "1.5px solid #ffffff",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "left, top, width, height",
          transition: "width 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 200ms",
        }}
      />
    </>
  );
}

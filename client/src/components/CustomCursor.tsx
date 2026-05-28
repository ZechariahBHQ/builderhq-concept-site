/* ============================================================
   CustomCursor — Warm Organic Editorial
   Crimson dot + lagging ring. Uses MutationObserver to re-attach
   hover listeners as new buttons/links mount (fixes cursor loss).
   ============================================================ */
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on pure-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf: number;
    let visible = false;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    // Start hidden until first mouse move
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

    // Hover expand/contract
    const onEnter = () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.style.borderColor = "var(--crimson)";
      dot.style.transform = "translate(-50%, -50%) scale(0)";
    };

    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "var(--crimson)";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const attachToEl = (el: Element) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    };

    const attachAll = () => {
      document.querySelectorAll("a, button").forEach(attachToEl);
    };

    attachAll();

    // Re-attach whenever new elements mount (menu drawer, toasts, etc.)
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
        className="cursor-dot"
        aria-hidden="true"
        style={{ transition: "transform 150ms var(--ease-out), opacity 200ms" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ transition: "width 220ms var(--ease-out), height 220ms var(--ease-out), opacity 200ms" }}
      />
    </>
  );
}

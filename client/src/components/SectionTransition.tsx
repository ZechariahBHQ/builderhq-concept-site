/* ============================================================
   SectionTransition — Scroll-driven background colour morph
   Fixed layer behind all content. Section IDs must match
   the id attributes on each section element in the DOM.
   Colour lerps smoothly at ~0.06 per frame (≈ 60fps).
   ============================================================ */
import { useEffect, useRef } from "react";

// Section IDs MUST match the id="" on each section component
const SECTION_MAP: Array<{ id: string; colour: string }> = [
  { id: "home",        colour: "#1a4a42" },   // hero — deep teal
  { id: "about",       colour: "#F7E8D8" },   // about — warm cream
  { id: "stats",       colour: "#EDD8C0" },   // stats strip — cream dark
  { id: "flavours",    colour: "#F7E8D8" },   // flavours — cream
  { id: "ingredients", colour: "#C8E8E0" },   // ingredient still-life — mint (star moment)
  { id: "story",       colour: "#F7E8D8" },   // story — cream
  { id: "gallery",     colour: "#EDD8C0" },   // gallery — cream dark
  { id: "partnership", colour: "#F7E8D8" },   // partnership — cream
  { id: "contact",     colour: "#8C1A1A" },   // contact — crimson
];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}

function lerpColour(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

export default function SectionTransition() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let current = "#1a4a42";
    let target = "#1a4a42";

    const getTarget = (): string => {
      const mid = window.innerHeight * 0.45;
      for (let i = SECTION_MAP.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_MAP[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid) return SECTION_MAP[i].colour;
        }
      }
      return SECTION_MAP[0].colour;
    };

    const tick = () => {
      target = getTarget();
        if (current !== target) {
        current = lerpColour(current, target, 0.035);
        // Snap when very close to avoid infinite micro-lerp
        if (Math.abs(hexToRgb(current)[0] - hexToRgb(target)[0]) < 1 &&
            Math.abs(hexToRgb(current)[1] - hexToRgb(target)[1]) < 1 &&
            Math.abs(hexToRgb(current)[2] - hexToRgb(target)[2]) < 1) {
          current = target;
        }
        if (bgRef.current) bgRef.current.style.backgroundColor = current;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor: "#1a4a42",
        pointerEvents: "none",
        willChange: "background-color",
      }}
    />
  );
}

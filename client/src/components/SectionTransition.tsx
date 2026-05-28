/* ============================================================
   SectionTransition — Scroll-driven background colour morph
   Fixed layer behind all content. Section IDs must match
   the id attributes on each section element in the DOM.
   Lerp speed adapts: slow for large colour jumps (cream→crimson),
   fast for small shifts (cream→cream-dark).
   ============================================================ */
import { useEffect, useRef } from "react";

// Section IDs MUST match the id="" on each section component
const SECTION_MAP: Array<{ id: string; colour: string; threshold?: number }> = [
  { id: "home",        colour: "#0F0000" },
  { id: "about",       colour: "#F7E8D8" },
  { id: "stats",       colour: "#EDD8C0" },
  { id: "flavours",    colour: "#F7E8D8" },
  { id: "ingredients", colour: "#EDD8C0" },
  { id: "story",       colour: "#F7E8D8" },
  { id: "gallery",     colour: "#EDD8C0" },
  { id: "partnership", colour: "#F7E8D8" },
  // Contact uses a lower threshold so crimson starts bleeding in
  // before the section fully enters — feels like a slow sunset
  { id: "contact",     colour: "#8C1A1A", threshold: 0.72 },
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

function colourDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
}

export default function SectionTransition() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let current = "#0F0000";
    let target = "#0F0000";

    const getTarget = (): string => {
      for (let i = SECTION_MAP.length - 1; i >= 0; i--) {
        const section = SECTION_MAP[i];
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const t = section.threshold ?? 0.45;
          if (rect.top <= window.innerHeight * t) return section.colour;
        }
      }
      return SECTION_MAP[0].colour;
    };

    const tick = () => {
      target = getTarget();
      if (current !== target) {
        // Adapt lerp speed: large jumps (e.g. cream→crimson) get a slower
        // speed so the transition feels like a gradual bleed, not a cut
        const dist = colourDistance(current, target);
        const speed = dist > 100 ? 0.014 : dist > 40 ? 0.028 : 0.042;
        current = lerpColour(current, target, speed);
        // Snap when very close to avoid infinite micro-lerp
        if (colourDistance(current, target) < 1) current = target;
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
        backgroundColor: "#0F0000",
        pointerEvents: "none",
        willChange: "background-color",
      }}
    />
  );
}

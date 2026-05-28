/* ============================================================
   useMagneticButton — Warm Organic Editorial
   Integrated systems:
   • Magnetic pull (strength 0.85, radius 180px, eased curve)
   • H: Gravity field glow — soft radial gradient appears as
     cursor approaches, intensifies closer to centre
   • D: Sticky ring snap — cursor ring locks to button centre
     on enter; dot moves freely inside
   ============================================================ */
import { useEffect, useRef } from "react";

// Global ring reference so we can reposition it from here
let globalRingEl: HTMLElement | null = null;
let globalDotEl: HTMLElement | null = null;
let ringSnapped = false;
let snapTarget: { x: number; y: number } | null = null;

export function registerCursorElements(dot: HTMLElement, ring: HTMLElement) {
  globalDotEl = dot;
  globalRingEl = ring;
}

export function useMagneticButton<T extends HTMLElement>(
  strength = 0.85,
  radius = 180
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    // ── H: Inject gravity glow pseudo-element via a div overlay ──
    const glow = document.createElement("div");
    glow.style.cssText = `
      position: absolute;
      inset: -60px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(140,26,26,0.18) 0%, rgba(140,26,26,0) 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 300ms ease, transform 300ms ease;
      z-index: -1;
      transform: scale(0.6);
    `;
    // Ensure parent can contain the glow
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
        // ── Magnetic pull ──
        const ease = Math.pow(1 - dist / radius, 1.3);
        const pull = ease * strength;
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;

        // ── H: Gravity glow intensity increases as cursor approaches ──
        const glowIntensity = 1 - dist / radius;
        glow.style.opacity = String(glowIntensity * 0.9);
        glow.style.transform = `scale(${0.6 + glowIntensity * 0.5})`;

        // ── D: Snap ring to button centre when close ──
        if (!ringSnapped && globalRingEl && dist < radius * 0.65) {
          ringSnapped = true;
          snapTarget = { x: cx, y: cy };
          globalRingEl.style.transition =
            "left 220ms cubic-bezier(0.23,1,0.32,1), top 220ms cubic-bezier(0.23,1,0.32,1), width 220ms, height 220ms, border-color 120ms, opacity 200ms";
          globalRingEl.style.left = `${cx}px`;
          globalRingEl.style.top = `${cy}px`;
          globalRingEl.style.width = `${Math.max(rect.width, rect.height) + 16}px`;
          globalRingEl.style.height = `${Math.max(rect.width, rect.height) + 16}px`;
        } else if (ringSnapped && snapTarget) {
          // Keep ring locked to button centre (button itself moves with magnet)
          const btnRect = el.getBoundingClientRect();
          const bcx = btnRect.left + btnRect.width / 2;
          const bcy = btnRect.top + btnRect.height / 2;
          globalRingEl!.style.left = `${bcx}px`;
          globalRingEl!.style.top = `${bcy}px`;
        }
      } else {
        el.style.transform = "";
        glow.style.opacity = "0";
        glow.style.transform = "scale(0.6)";

        // ── D: Release ring snap ──
        if (ringSnapped) {
          ringSnapped = false;
          snapTarget = null;
          if (globalRingEl) {
            globalRingEl.style.transition =
              "width 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), border-color 120ms, opacity 200ms";
            globalRingEl.style.width = "36px";
            globalRingEl.style.height = "36px";
            // Ring will resume following cursor via CustomCursor's RAF loop
          }
        }
      }
    };

    const onLeave = () => {
      el.style.transition = "transform 550ms cubic-bezier(0.23,1,0.32,1)";
      el.style.transform = "";
      glow.style.opacity = "0";
      glow.style.transform = "scale(0.6)";
      setTimeout(() => { if (el) el.style.transition = ""; }, 570);

      if (ringSnapped) {
        ringSnapped = false;
        snapTarget = null;
        if (globalRingEl) {
          globalRingEl.style.transition =
            "width 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), border-color 120ms, opacity 200ms";
          globalRingEl.style.width = "36px";
          globalRingEl.style.height = "36px";
        }
      }
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

export { ringSnapped };

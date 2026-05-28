/* ============================================================
   FallAway — page elements drop off screen with gravity
   when the Flavours takeover sequence begins
   ============================================================ */
import { useEffect, useRef } from "react";
import { useFlavours } from "@/contexts/FlavoursContext";

export default function FallAway() {
  const { phase } = useFlavours();
  const hasRun = useRef(false);

  useEffect(() => {
    const isFalling = phase === "falling";
    const isReturning = phase === "returning";

    if (isFalling && !hasRun.current) {
      hasRun.current = true;
      // Grab all top-level page sections and the navbar
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-fall-target]"
      );

      targets.forEach((el, i) => {
        const delay = i * 55 + Math.random() * 40;
        const rotation = (Math.random() - 0.5) * 18;
        el.style.transition = `transform ${700 + i * 40}ms cubic-bezier(0.55, 0, 1, 0.45) ${delay}ms, opacity 400ms ease ${delay}ms`;
        el.style.transformOrigin = `${30 + Math.random() * 40}% bottom`;
        el.style.transform = `translateY(120vh) rotate(${rotation}deg)`;
        el.style.opacity = "0";
      });
    }

    if (isReturning) {
      hasRun.current = false;
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-fall-target]"
      );
      targets.forEach((el, i) => {
        const delay = i * 60;
        el.style.transition = `transform 700ms cubic-bezier(0.23,1,0.32,1) ${delay}ms, opacity 500ms ease ${delay}ms`;
        el.style.transform = "";
        el.style.opacity = "";
        // Clean up after animation
        setTimeout(() => {
          el.style.transition = "";
          el.style.transformOrigin = "";
        }, 700 + delay + 100);
      });
    }
  }, [phase]);

  return null;
}

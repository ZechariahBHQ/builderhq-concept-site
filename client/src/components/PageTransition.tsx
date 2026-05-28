/* ============================================================
   PageTransition — Warm Organic Editorial
   Full-screen crimson wipe that sweeps in from the left edge,
   holds for a beat, then retracts off the right edge.
   Triggers on mount (initial load) and on route change.
   Uses CSS clip-path for a clean sharp edge wipe.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

type Phase = "idle" | "enter" | "hold" | "exit";

export default function PageTransition() {
  const [phase, setPhase] = useState<Phase>("enter");
  const [location] = useLocation();
  const prevLocation = useRef(location);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("enter");
    // After panel covers screen, hold briefly then exit
    timerRef.current = setTimeout(() => {
      setPhase("hold");
      timerRef.current = setTimeout(() => {
        setPhase("exit");
        timerRef.current = setTimeout(() => {
          setPhase("idle");
        }, 600);
      }, 120);
    }, 550);
  };

  // Fire on initial mount
  useEffect(() => {
    runSequence();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire on route change
  useEffect(() => {
    if (location !== prevLocation.current) {
      prevLocation.current = location;
      runSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (phase === "idle") return null;

  // Clip-path wipe: enter = right edge sweeps left-to-right covering screen
  //                 exit  = left edge sweeps left-to-right revealing screen
  const clipEnter = phase === "enter"
    ? "inset(0 0% 0 0)"     // fully visible — panel covers screen
    : "inset(0 0% 0 0)";

  const transform =
    phase === "enter"
      ? "translateX(0%)"
      : phase === "hold"
      ? "translateX(0%)"
      : "translateX(100%)";   // exit: panel slides off to the right

  // On enter we slide in from left: start at -100% → 0%
  const initialTransform = phase === "enter" ? undefined : undefined;
  void initialTransform; // suppress unused warning

  return (
    <>
      {/* Wipe panel */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: "var(--crimson)",
          transform,
          transition:
            phase === "enter"
              ? "transform 550ms cubic-bezier(0.77,0,0.175,1)"
              : phase === "exit"
              ? "transform 600ms cubic-bezier(0.77,0,0.175,1)"
              : "none",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Brand wordmark shown during wipe */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "var(--cream)",
            letterSpacing: "0.08em",
            opacity: phase === "hold" ? 1 : 0,
            transition: "opacity 180ms ease",
            userSelect: "none",
          }}
        >
          BRAND
        </span>
      </div>

      {/* Thin leading edge accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          width: "3px",
          zIndex: 10001,
          background: "var(--cream)",
          transform,
          transition:
            phase === "enter"
              ? "transform 550ms cubic-bezier(0.77,0,0.175,1)"
              : phase === "exit"
              ? "transform 600ms cubic-bezier(0.77,0,0.175,1)"
              : "none",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
    </>
  );
}

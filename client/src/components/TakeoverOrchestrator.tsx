/* ============================================================
   TakeoverOrchestrator — renders the crimson wipe panel
   during wiping-in and wiping-out phases of the takeover
   ============================================================ */
import { useFlavours } from "@/contexts/FlavoursContext";
import FallAway from "./FallAway";
import IngredientRain from "./IngredientRain";
import FlavoursShowcase from "./FlavoursShowcase";
import { useCallback } from "react";

export default function TakeoverOrchestrator() {
  const { phase } = useFlavours();

  const isWipingIn = phase === "wiping-in";
  const isWipingOut = phase === "wiping-out";
  const isWiping = isWipingIn || isWipingOut;
  const isRaining = phase === "raining";

  const handleSettled = useCallback(() => {
    // Rain settled — wipe-in starts automatically via context timers
  }, []);

  return (
    <>
      {/* FallAway: watches phase and animates DOM targets */}
      <FallAway />

      {/* Ingredient rain overlay */}
      <IngredientRain active={isRaining} onSettled={handleSettled} />

      {/* Crimson wipe panel */}
      {isWiping && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9800,
            background: "var(--crimson, #8C1A1A)",
            transform: isWipingIn ? "translateX(0%)" : "translateX(100%)",
            transition: isWipingIn
              ? "transform 600ms cubic-bezier(0.77,0,0.175,1)"
              : "transform 600ms cubic-bezier(0.77,0,0.175,1)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Brand wordmark shown during wipe */}
          <span
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "var(--cream, #F7E8D8)",
              letterSpacing: "0.08em",
              userSelect: "none",
            }}
          >
            BRAND
          </span>
          {/* Leading edge accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "3px",
              background: "var(--cream, #F7E8D8)",
              opacity: 0.5,
            }}
          />
        </div>
      )}

      {/* Full-screen flavour showcase */}
      <FlavoursShowcase />
    </>
  );
}

/* ============================================================
   FlavoursContext — manages the cinematic takeover sequence state
   States: idle → falling → raining → wiping → showcase → returning
   ============================================================ */
import { createContext, useContext, useState, useCallback } from "react";

export type TakeoverPhase =
  | "idle"
  | "falling"
  | "raining"
  | "wiping-in"
  | "showcase"
  | "wiping-out"
  | "returning";

interface FlavoursContextValue {
  phase: TakeoverPhase;
  activeFlav: number;
  enterShowcase: () => void;
  exitShowcase: () => void;
  setActiveFlav: (i: number) => void;
}

const FlavoursContext = createContext<FlavoursContextValue>({
  phase: "idle",
  activeFlav: 0,
  enterShowcase: () => {},
  exitShowcase: () => {},
  setActiveFlav: () => {},
});

export function FlavoursProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<TakeoverPhase>("idle");
  const [activeFlav, setActiveFlav] = useState(0);

  const enterShowcase = useCallback(() => {
    if (phase !== "idle") return;
    // 1. Fall away
    setPhase("falling");
    // 2. After fall (900ms) → ingredient rain
    setTimeout(() => setPhase("raining"), 900);
    // 3. After rain settles (1800ms) → crimson wipe in
    setTimeout(() => setPhase("wiping-in"), 2700);
    // 4. After wipe covers screen (600ms) → showcase
    setTimeout(() => setPhase("showcase"), 3350);
  }, [phase]);

  const exitShowcase = useCallback(() => {
    if (phase !== "showcase") return;
    // Wipe out
    setPhase("wiping-out");
    // After wipe exits (600ms) → returning (page reassembles)
    setTimeout(() => setPhase("returning"), 650);
    // After reassemble animation (800ms) → idle
    setTimeout(() => setPhase("idle"), 1500);
  }, [phase]);

  return (
    <FlavoursContext.Provider
      value={{ phase, activeFlav, enterShowcase, exitShowcase, setActiveFlav }}
    >
      {children}
    </FlavoursContext.Provider>
  );
}

export function useFlavours() {
  return useContext(FlavoursContext);
}

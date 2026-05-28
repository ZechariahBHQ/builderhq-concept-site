/* ============================================================
   IngredientRain — ingredients tumble from top with physics
   Each ingredient has unique: entry delay, spin speed, bounce,
   horizontal drift, and final resting position/angle
   ============================================================ */
import { useEffect, useRef } from "react";

interface Ingredient {
  id: number;
  emoji: string;
  label: string;
  startX: number;   // % of viewport width
  endX: number;
  endY: number;     // % of viewport height
  delay: number;    // ms
  spinDir: 1 | -1;
  spinSpeed: number; // deg per frame
  size: number;     // px
  endRot: number;   // final resting rotation deg
  bounces: number;
}

const INGREDIENTS: Ingredient[] = [
  { id: 1,  emoji: "🥭", label: "mango",       startX: 12, endX: 8,  endY: 55, delay: 0,    spinDir: 1,  spinSpeed: 4.2, size: 72, endRot: -28, bounces: 2 },
  { id: 2,  emoji: "🍓", label: "strawberry",  startX: 28, endX: 24, endY: 68, delay: 120,  spinDir: -1, spinSpeed: 5.8, size: 60, endRot: 15,  bounces: 3 },
  { id: 3,  emoji: "🍋", label: "lemon",       startX: 48, endX: 52, endY: 72, delay: 240,  spinDir: 1,  spinSpeed: 3.5, size: 64, endRot: 42,  bounces: 2 },
  { id: 4,  emoji: "🍫", label: "chocolate",   startX: 68, endX: 71, endY: 60, delay: 80,   spinDir: -1, spinSpeed: 2.8, size: 68, endRot: -55, bounces: 1 },
  { id: 5,  emoji: "🍇", label: "grape",       startX: 82, endX: 85, endY: 65, delay: 320,  spinDir: 1,  spinSpeed: 6.1, size: 58, endRot: 22,  bounces: 3 },
  { id: 6,  emoji: "🥝", label: "kiwi",        startX: 20, endX: 17, endY: 78, delay: 450,  spinDir: -1, spinSpeed: 4.0, size: 62, endRot: -18, bounces: 2 },
  { id: 7,  emoji: "🍑", label: "peach",       startX: 58, endX: 62, endY: 74, delay: 200,  spinDir: 1,  spinSpeed: 3.2, size: 66, endRot: 35,  bounces: 2 },
  { id: 8,  emoji: "🍒", label: "cherry",      startX: 38, endX: 41, endY: 80, delay: 560,  spinDir: -1, spinSpeed: 7.0, size: 54, endRot: -40, bounces: 4 },
  { id: 9,  emoji: "🌿", label: "mint",        startX: 75, endX: 78, endY: 50, delay: 380,  spinDir: 1,  spinSpeed: 2.5, size: 56, endRot: 60,  bounces: 1 },
  { id: 10, emoji: "🍦", label: "vanilla",     startX: 5,  endX: 3,  endY: 45, delay: 640,  spinDir: -1, spinSpeed: 3.8, size: 70, endRot: -12, bounces: 2 },
  { id: 11, emoji: "🫐", label: "blueberry",   startX: 90, endX: 88, endY: 70, delay: 160,  spinDir: 1,  spinSpeed: 5.2, size: 58, endRot: 28,  bounces: 3 },
  { id: 12, emoji: "🍬", label: "candy",       startX: 44, endX: 47, endY: 42, delay: 720,  spinDir: -1, spinSpeed: 4.6, size: 60, endRot: -65, bounces: 2 },
];

interface Props {
  active: boolean;
  onSettled: () => void;
}

export default function IngredientRain({ active, onSettled }: Props) {
  const settledRef = useRef(false);

  useEffect(() => {
    if (!active) {
      settledRef.current = false;
      return;
    }
    // All ingredients settle after max delay + fall duration (~1.4s) + bounce time
    const maxDelay = Math.max(...INGREDIENTS.map(i => i.delay));
    const totalTime = maxDelay + 1400;
    const timer = setTimeout(() => {
      if (!settledRef.current) {
        settledRef.current = true;
        onSettled();
      }
    }, totalTime);
    return () => clearTimeout(timer);
  }, [active, onSettled]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9500,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {INGREDIENTS.map((ing) => (
        <IngredientItem key={ing.id} ing={ing} />
      ))}
    </div>
  );
}

function IngredientItem({ ing }: { ing: Ingredient }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let raf: number;
    let phase: "falling" | "bouncing" | "settled" = "falling";
    let currentY = -ing.size - 20;
    let velocityY = 0;
    let currentRot = 0;
    let bounceCount = 0;
    const gravity = 1.8;
    const targetY = (ing.endY / 100) * window.innerHeight;
    const bounceDamping = 0.45;

    const startTime = performance.now() + ing.delay;

    const animate = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(animate);
        return;
      }

      if (phase === "falling") {
        velocityY += gravity;
        currentY += velocityY;
        currentRot += ing.spinDir * ing.spinSpeed;

        if (currentY >= targetY) {
          currentY = targetY;
          if (bounceCount < ing.bounces && Math.abs(velocityY) > 3) {
            velocityY = -velocityY * bounceDamping;
            bounceCount++;
            phase = "bouncing";
          } else {
            phase = "settled";
            currentRot = ing.endRot;
          }
        }
      } else if (phase === "bouncing") {
        velocityY += gravity;
        currentY += velocityY;
        currentRot += ing.spinDir * ing.spinSpeed * 0.4;

        if (currentY >= targetY) {
          currentY = targetY;
          if (bounceCount < ing.bounces && Math.abs(velocityY) > 3) {
            velocityY = -velocityY * bounceDamping;
            bounceCount++;
          } else {
            phase = "settled";
            currentRot = ing.endRot;
          }
        } else if (currentY < targetY && velocityY < 0) {
          // still bouncing up
        }
      }

      el.style.transform = `translate(-50%, 0) translateY(${currentY}px) rotate(${currentRot}deg)`;

      if (phase !== "settled") {
        frame++;
        raf = requestAnimationFrame(animate);
      } else {
        // Snap to final resting state with a tiny spring
        el.style.transition = "transform 300ms cubic-bezier(0.23,1,0.32,1)";
        el.style.transform = `translate(-50%, 0) translateY(${targetY}px) rotate(${ing.endRot}deg)`;
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [ing]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: `${ing.startX}%`,
        fontSize: `${ing.size}px`,
        lineHeight: 1,
        userSelect: "none",
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
        willChange: "transform",
      }}
      title={ing.label}
    >
      {ing.emoji}
    </div>
  );
}

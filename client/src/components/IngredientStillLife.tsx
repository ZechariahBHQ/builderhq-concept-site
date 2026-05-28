/* ============================================================
   IngredientStillLife — Star Moment 3
   Pinned scroll section where real editorial ingredient photos
   fall into frame one at a time, building a still-life.
   Each photo lands with weight, settles at a slight angle.
   All images served from /public/images/ — no CDN dependency.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const INGREDIENTS = [
  {
    label: "Alphonso Mango",
    src: "/images/ingredient-mango.jpg",
    position: { top: "8%", left: "5%", rotate: "-7deg", width: "clamp(160px, 22vw, 280px)" },
    delay: 0,
  },
  {
    label: "Belgian Chocolate",
    src: "/images/ingredient-chocolate.jpg",
    position: { top: "10%", right: "4%", rotate: "5deg", width: "clamp(140px, 20vw, 260px)" },
    delay: 280,
  },
  {
    label: "Sicilian Pistachio",
    src: "/images/ingredient-pistachio.jpg",
    position: { bottom: "12%", left: "10%", rotate: "4deg", width: "clamp(130px, 18vw, 240px)" },
    delay: 560,
  },
  {
    label: "Wild Raspberry",
    src: "/images/ingredient-raspberry.jpg",
    position: { bottom: "10%", right: "8%", rotate: "-6deg", width: "clamp(140px, 19vw, 250px)" },
    delay: 840,
  },
];

interface IngredientPos {
  top?: string; bottom?: string; left?: string; right?: string;
  rotate: string; width: string;
}

interface CardProps {
  label: string; src: string;
  position: IngredientPos; delay: number; visible: boolean;
}

function IngredientCard({ label, src, position, delay, visible }: CardProps) {
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setLanded(true), delay);
      return () => clearTimeout(t);
    } else {
      setLanded(false);
    }
  }, [visible, delay]);

  return (
    <div
      className="ingredient-card"
      style={{
        position: "absolute",
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        width: position.width,
        opacity: landed ? 1 : 0,
        transform: landed
          ? `rotate(${position.rotate}) translateY(0) scale(1)`
          : `rotate(${position.rotate}) translateY(-120px) scale(0.92)`,
        transition: landed
          ? `opacity 0.45s cubic-bezier(0.23,1,0.32,1) ${delay * 0.001}s,
             transform 0.65s cubic-bezier(0.34,1.4,0.64,1) ${delay * 0.001}s`
          : "none",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 16px 32px rgba(140,26,26,0.22))",
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: "100%",
          display: "block",
          borderRadius: "4px",
        }}
      />
      <div
        style={{
          marginTop: "0.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--crimson)",
          opacity: 0.55,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function IngredientStillLife() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "85vh",
        background: "transparent",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
      }}
    >
      {/* Subtle mint glow circle — depth accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(60vw, 500px)",
          height: "min(60vw, 500px)",
          borderRadius: "50%",
          background: "var(--mint)",
          opacity: 0.45,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Central editorial text */}
      <div style={{ textAlign: "center", zIndex: 20, position: "relative", maxWidth: "400px" }}>
        <p className="section-label" style={{ marginBottom: "1rem" }}>
          The ingredients
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            color: "var(--crimson)",
            lineHeight: 0.88,
            marginBottom: "1.5rem",
          }}
        >
          ONLY THE
          <br />
          REAL THING
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--crimson)",
            opacity: 0.65,
            lineHeight: 1.7,
          }}
        >
          Single-origin. Seasonal. No shortcuts.
          Every flavour starts with the finest ingredient
          we can source — then we let it speak for itself.
        </p>

        {/* Progress dots — show which ingredients have landed */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          {INGREDIENTS.map((ing, i) => (
            <IngredientDot
              key={ing.label}
              visible={visible}
              delay={ing.delay + 200}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Ingredient photos falling in */}
      {INGREDIENTS.map((ing) => (
        <IngredientCard key={ing.label} {...ing} visible={visible} />
      ))}
    </section>
  );
}

function IngredientDot({ visible, delay, index }: { visible: boolean; delay: number; index: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setActive(true), delay);
      return () => clearTimeout(t);
    } else {
      setActive(false);
    }
  }, [visible, delay]);

  return (
    <div
      style={{
        width: active ? "24px" : "6px",
        height: "6px",
        borderRadius: "3px",
        background: active ? "var(--crimson)" : "rgba(140,26,26,0.2)",
        transition: `all 0.4s cubic-bezier(0.23,1,0.32,1) ${index * 0.05}s`,
      }}
    />
  );
}

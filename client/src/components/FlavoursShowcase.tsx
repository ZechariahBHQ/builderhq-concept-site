/* ============================================================
   FlavoursShowcase — full-screen per-flavour cinematic view
   One flavour fills the entire viewport at a time
   Arrow keys / scroll / swipe to cycle through flavours
   Back button triggers reverse sequence
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useFlavours } from "@/contexts/FlavoursContext";

const SHOWCASE_FLAVOURS = [
  {
    id: 1,
    name: "RASPBERRY\nMOCHI",
    tagline: "Tart, silky, unforgettable",
    desc: "Fresh raspberries folded into hand-stretched mochi. A Japanese technique, a local obsession.",
    bg: "#C8405A",
    accent: "#F7E8D8",
    emoji: "🍓",
    weight: "80g",
  },
  {
    id: 2,
    name: "MANGO\nPASSION",
    tagline: "Sun-ripened. Zero compromise.",
    desc: "Alphonso mango pureed fresh, swirled with passion fruit from Ecuador. Tropical and electric.",
    bg: "#E8A020",
    accent: "#1A0A00",
    emoji: "🥭",
    weight: "75g",
  },
  {
    id: 3,
    name: "DARK\nCHOCOLATE",
    tagline: "72% cacao. Tempered by hand.",
    desc: "Belgian couverture chocolate, tempered on-site every morning. Bitter, deep, and deeply satisfying.",
    bg: "#2C1810",
    accent: "#F7E8D8",
    emoji: "🍫",
    weight: "85g",
  },
  {
    id: 4,
    name: "PISTACHIO\nCREAM",
    tagline: "Ground in-house. Every batch.",
    desc: "Sicilian pistachios stone-ground into a paste here, not imported pre-made. You will taste the difference.",
    bg: "#5C7A3E",
    accent: "#F7E8D8",
    emoji: "🌿",
    weight: "80g",
  },
  {
    id: 5,
    name: "LEMON\nSOURDOUGH",
    tagline: "Bright. Tangy. Unexpected.",
    desc: "Amalfi lemon zest with a sourdough culture base. Sounds strange. Tastes extraordinary.",
    bg: "#D4B820",
    accent: "#1A1A00",
    emoji: "🍋",
    weight: "75g",
  },
  {
    id: 6,
    name: "WILD\nBLUEBERRY",
    tagline: "Foraged. Not farmed.",
    desc: "Wild blueberries from mountain forests. Smaller, more intense, and nothing like the supermarket kind.",
    bg: "#3A2868",
    accent: "#F7E8D8",
    emoji: "🫐",
    weight: "78g",
  },
  {
    id: 7,
    name: "PEACH\n& BASIL",
    tagline: "The garden in a popsicle.",
    desc: "White peaches from the valley, fresh basil from our roof garden. Herbal, floral, and surprisingly addictive.",
    bg: "#D4784A",
    accent: "#F7E8D8",
    emoji: "🍑",
    weight: "80g",
  },
  {
    id: 8,
    name: "CHERRY\nBOURBON",
    tagline: "Grown-up. Seriously.",
    desc: "Morello cherries macerated with a splash of bourbon. For the adults in the room — and the kids who think they are.",
    bg: "#8C1A1A",
    accent: "#F7E8D8",
    emoji: "🍒",
    weight: "82g",
  },
];

export default function FlavoursShowcase() {
  const { phase, activeFlav, setActiveFlav, exitShowcase } = useFlavours();
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = phase === "showcase";

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setVisible(true), 80);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Escape") exitShowcase();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, activeFlav]);

  // Wheel navigation
  useEffect(() => {
    if (!isActive) return;
    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel < 600) return;
      lastWheel = now;
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isActive, activeFlav]);

  const goNext = () => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveFlav((activeFlav + 1) % SHOWCASE_FLAVOURS.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  const goPrev = () => {
    if (transitioning) return;
    setTransitioning(true);
    setActiveFlav((activeFlav - 1 + SHOWCASE_FLAVOURS.length) % SHOWCASE_FLAVOURS.length);
    setTimeout(() => setTransitioning(false), 500);
  };

  if (!isActive && !visible) return null;

  const flav = SHOWCASE_FLAVOURS[activeFlav];

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9600,
        background: flav.bg,
        transition: "background 600ms cubic-bezier(0.77,0,0.175,1), opacity 400ms ease",
        opacity: visible ? 1 : 0,
        overflow: "hidden",
      }}
    >
      {/* Flavour number indicator */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        {SHOWCASE_FLAVOURS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveFlav(i)}
            style={{
              width: i === activeFlav ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "4px",
              background: flav.accent,
              opacity: i === activeFlav ? 1 : 0.35,
              border: "none",
              padding: 0,
              transition: "width 300ms cubic-bezier(0.23,1,0.32,1), opacity 300ms",
              cursor: "none",
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={exitShowcase}
        style={{
          position: "absolute",
          top: "1.8rem",
          left: "2rem",
          zIndex: 10,
          color: flav.accent,
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "transparent",
          border: `1px solid ${flav.accent}`,
          padding: "0.4rem 1rem",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.85,
          transition: "opacity 200ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
      >
        ← Back
      </button>

      {/* Flavour count */}
      <div
        style={{
          position: "absolute",
          top: "1.8rem",
          right: "2rem",
          zIndex: 10,
          color: flav.accent,
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          opacity: 0.6,
        }}
      >
        {String(activeFlav + 1).padStart(2, "0")} / {String(SHOWCASE_FLAVOURS.length).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div
        key={activeFlav}
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "6rem 5vw 4rem",
          gap: "4vw",
          animation: "showcaseEnter 500ms cubic-bezier(0.23,1,0.32,1) forwards",
        }}
      >
        {/* Left: text */}
        <div>
          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
              color: flav.accent,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.65,
              marginBottom: "1.5rem",
            }}
          >
            {flav.tagline}
          </p>

          {/* Name */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 11vw, 9rem)",
              color: flav.accent,
              lineHeight: 0.88,
              marginBottom: "2.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {flav.name}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              color: flav.accent,
              opacity: 0.75,
              lineHeight: 1.7,
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            {flav.desc}
          </p>

          {/* Weight + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: flav.accent,
                opacity: 0.5,
                letterSpacing: "0.1em",
              }}
            >
              {flav.weight}
            </span>
            <button
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: flav.bg,
                background: flav.accent,
                border: "none",
                padding: "0.7rem 2rem",
                cursor: "none",
                transition: "transform 200ms cubic-bezier(0.23,1,0.32,1), opacity 200ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right: giant emoji + decorative ring */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Decorative background circle */}
          <div
            style={{
              position: "absolute",
              width: "clamp(280px, 42vw, 520px)",
              height: "clamp(280px, 42vw, 520px)",
              borderRadius: "50%",
              border: `1px solid ${flav.accent}`,
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "clamp(220px, 34vw, 420px)",
              height: "clamp(220px, 34vw, 420px)",
              borderRadius: "50%",
              border: `1px solid ${flav.accent}`,
              opacity: 0.1,
            }}
          />

          {/* Giant emoji */}
          <div
            style={{
              fontSize: "clamp(8rem, 18vw, 16rem)",
              lineHeight: 1,
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.35))",
              animation: "floatIngredient 3s ease-in-out infinite",
              userSelect: "none",
            }}
          >
            {flav.emoji}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        style={{
          position: "absolute",
          left: "2rem",
          bottom: "2.5rem",
          color: flav.accent,
          background: "transparent",
          border: `1px solid ${flav.accent}`,
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          opacity: 0.6,
          fontSize: "1.1rem",
          transition: "opacity 200ms, transform 200ms",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        ←
      </button>
      <button
        onClick={goNext}
        style={{
          position: "absolute",
          right: "2rem",
          bottom: "2.5rem",
          color: flav.accent,
          background: "transparent",
          border: `1px solid ${flav.accent}`,
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          opacity: 0.6,
          fontSize: "1.1rem",
          transition: "opacity 200ms, transform 200ms",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        →
      </button>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: flav.accent,
          fontFamily: "var(--font-body)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.4,
        }}
      >
        Scroll or use arrow keys to explore
      </div>

      <style>{`
        @keyframes showcaseEnter {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatIngredient {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50%       { transform: translateY(-18px) rotate(4deg); }
        }
      `}</style>
    </div>
  );
}

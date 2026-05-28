/* ============================================================
   StatsStrip — Warm Organic Editorial
   Horizontal band of animated counters on cream-dark background
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 24, suffix: "+", label: "Flavours" },
  { value: 150, suffix: "+", label: "Stockist Locations" },
  { value: 8, suffix: "", label: "Years of Craft" },
  { value: 100, suffix: "%", label: "Natural Ingredients" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section
      style={{
        background: "var(--cream-dark)",
        borderTop: "1px solid rgba(140,26,26,0.12)",
        borderBottom: "1px solid rgba(140,26,26,0.12)",
        padding: "3.5rem 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
        id="stats-grid"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.4rem",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(140,26,26,0.15)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                color: "var(--crimson)",
                lineHeight: 1,
              }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                opacity: 0.6,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(140,26,26,0.12);
            padding-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

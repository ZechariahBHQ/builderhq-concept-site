/* ============================================================
   HeroSection — Warm Organic Editorial
   Full-screen photo background · oversized white Bebas Neue type
   anchored bottom-left · narrative paragraph mid-right
   circular dashed CTA · scroll-down arrow bottom-right
   ============================================================ */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/hero-icecream-bhqnanCeVxKP9q5ne6Btww.webp";

interface HeroSectionProps {
  onScrollDown?: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const headlineRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!headlineRef.current) return;
      const y = window.scrollY * 0.18;
      headlineRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      const next = document.querySelector("#about");
      if (next) next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#2a6b60",
      }}
    >
      {/* Background photograph */}
      <img
        src={HERO_IMAGE}
        alt="Person enjoying an artisan ice cream popsicle"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
        loading="eager"
      />

      {/* Dark gradient overlay — bottom-left for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* ── Oversized headline — bottom-left ── */}
      <div
        ref={headlineRef}
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          lineHeight: 0.88,
          zIndex: 2,
          willChange: "transform",
        }}
      >
        {["TRUE", "ICE", "CREAM"].map((word) => (
          <div
            key={word}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 16vw, 14rem)",
              color: "#fff",
              letterSpacing: "0.01em",
              display: "block",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* ── Narrative paragraph + circular CTA — mid-right ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "clamp(1.5rem, 6vw, 7rem)",
          transform: "translateY(-50%)",
          maxWidth: "320px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Not just another frozen treat. Every flavour is crafted from
          single-origin ingredients — Sicilian pistachios, Alphonso mangoes,
          Belgian chocolate. One bite and you'll understand the difference.
        </p>

        {/* Circular CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button
            className="circle-cta"
            onClick={() => {
              const el = document.querySelector("#flavours");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Explore flavours"
          >
            <ArrowRight size={20} color="#fff" strokeWidth={1.5} />
          </button>
          <span
            style={{
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Flavours
          </span>
        </div>
      </div>

      {/* ── Scroll-down cue — bottom-right ── */}
      <button
        onClick={handleScrollDown}
        aria-label="Scroll down"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          zIndex: 2,
          background: "none",
          border: "1.5px solid rgba(255,255,255,0.5)",
          color: "#fff",
          width: "48px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "24px",
          cursor: "pointer",
          transition: "border-color 200ms, background 200ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "none";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)";
        }}
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </button>

      {/* ── Spinning marquee text at very bottom ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "36px",
          background: "rgba(140,26,26,0.88)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cream)",
                whiteSpace: "nowrap",
                padding: "0 2rem",
              }}
            >
              A BRIGHT MAP OF TASTES * NATURAL INGREDIENTS * HANDCRAFTED DAILY *
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

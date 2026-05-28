/* ============================================================
   HeroSection — Warm Organic Editorial
   Full-screen photo · oversized Bebas Neue headline
   Magnetic scroll-down button · fixed scroll-to-about
   Scroll-velocity skew on headline block
   ============================================================ */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useMagneticButton } from "@/hooks/useMagneticButton";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/hero-icecream-bhqnanCeVxKP9q5ne6Btww.webp";

export default function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollBtnRef = useMagneticButton<HTMLButtonElement>(0.42, 90);
  const ctaBtnRef = useMagneticButton<HTMLButtonElement>(0.38, 80);

  // Parallax on the headline text (moves slower than scroll)
  useEffect(() => {
    let raf: number;
    let ticking = false;
    const handle = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(() => {
          if (headlineRef.current) {
            headlineRef.current.style.transform = `translateY(${window.scrollY * 0.16}px)`;
          }
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => { window.removeEventListener("scroll", handle); cancelAnimationFrame(raf); };
  }, []);

  // Scroll-velocity skew on the whole hero content
  const skewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY;
    let currentSkew = 0;
    let raf: number;
    const tick = () => {
      const y = window.scrollY;
      const vel = y - lastY;
      lastY = y;
      const target = Math.max(-3.5, Math.min(3.5, vel * 0.055));
      currentSkew += (target - currentSkew) * 0.1;
      if (skewRef.current) {
        skewRef.current.style.transform =
          Math.abs(currentSkew) > 0.01
            ? `skewY(${currentSkew.toFixed(3)}deg)`
            : "";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) {
      const top = about.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
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

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Skew wrapper — velocity skew applied here */}
      <div ref={skewRef} style={{ position: "absolute", inset: 0, zIndex: 2, willChange: "transform" }}>

        {/* Oversized headline — bottom-left */}
        <div
          ref={headlineRef}
          style={{
            position: "absolute",
            bottom: "8%",
            left: 0,
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            lineHeight: 0.88,
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

        {/* Narrative paragraph + circular CTA — mid-right */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "clamp(1.5rem, 6vw, 7rem)",
            transform: "translateY(-50%)",
            maxWidth: "320px",
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

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <button
              ref={ctaBtnRef}
              className="circle-cta"
              onClick={() => {
                const el = document.getElementById("flavours");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              aria-label="Explore flavours"
              style={{ willChange: "transform" }}
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

        {/* Scroll-down cue — bottom-right — magnetic */}
        <button
          ref={scrollBtnRef}
          onClick={scrollToAbout}
          aria-label="Scroll to About"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
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
            willChange: "transform",
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
      </div>

      {/* Marquee strip at very bottom */}
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

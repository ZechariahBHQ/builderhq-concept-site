/* ============================================================
   HeroSection — Immersive Pinned Hero
   New cinematic hero image pinned behind content
   Headline reveals progressively as user scrolls
   Scroll-velocity skew · magnetic buttons · marquee strip
   ============================================================ */
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useMagneticButton } from "@/hooks/useMagneticButton";

const HERO_IMG_URL = "/images/hero-crimson-v1.jpg";

export default function HeroSection() {
  const scrollBtnRef = useMagneticButton<HTMLButtonElement>(0.72, 140);
  const ctaBtnRef = useMagneticButton<HTMLButtonElement>(0.68, 130);

  // Parallax: image moves slower than scroll for depth
  const imgRef = useRef<HTMLImageElement>(null);
  // Skew on hero content
  const skewRef = useRef<HTMLDivElement>(null);
  // Word reveal refs
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let currentSkew = 0;
    let raf: number;

    const tick = () => {
      const y = window.scrollY;
      const vel = y - lastY;
      lastY = y;

      // Skew
      const target = Math.max(-3, Math.min(3, vel * 0.05));
      currentSkew += (target - currentSkew) * 0.1;
      if (skewRef.current) {
        skewRef.current.style.transform =
          Math.abs(currentSkew) > 0.01
            ? `skewY(${currentSkew.toFixed(3)}deg)`
            : "";
      }

      // Image parallax — moves at 0.45x scroll speed (slower = more depth)
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${y * 0.28}px) scale(1.08)`;
      }

      // Progressive word reveal based on scroll position
      const heroHeight = window.innerHeight;
      const progress = Math.min(1, y / (heroHeight * 0.6));

      if (word1Ref.current) {
        const p = Math.max(0, Math.min(1, (progress - 0) / 0.33));
        word1Ref.current.style.opacity = String(p);
        word1Ref.current.style.transform = `translateY(${(1 - p) * 40}px)`;
      }
      if (word2Ref.current) {
        const p = Math.max(0, Math.min(1, (progress - 0.15) / 0.33));
        word2Ref.current.style.opacity = String(p);
        word2Ref.current.style.transform = `translateY(${(1 - p) * 40}px)`;
      }
      if (word3Ref.current) {
        const p = Math.max(0, Math.min(1, (progress - 0.3) / 0.33));
        word3Ref.current.style.opacity = String(p);
        word3Ref.current.style.transform = `translateY(${(1 - p) * 40}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // On mount, show words immediately (they reveal on scroll after)
  useEffect(() => {
    const words = [word1Ref, word2Ref, word3Ref];
    words.forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.opacity = "1";
        ref.current.style.transform = "translateY(0)";
        ref.current.style.transition = `opacity 0.9s var(--ease-out) ${i * 0.12}s, transform 0.9s var(--ease-out) ${i * 0.12}s`;
      }
    });
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
        background: "#0F0000",
      }}
    >
      {/* Cinematic background photograph — parallax pinned */}
      <img
        ref={imgRef}
        src={HERO_IMG_URL}
        alt="Person enjoying an artisan ice cream popsicle"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "115%",
          objectFit: "cover",
          objectPosition: "center 30%",
          willChange: "transform",
          transformOrigin: "center top",
        }}
        loading="eager"
      />

      {/* Gradient overlay — darker on left for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(15,0,0,0.72) 0%, rgba(15,0,0,0.38) 45%, rgba(15,0,0,0.08) 100%)",
          zIndex: 1,
        }}
      />

      {/* Subtle vignette bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, rgba(15,0,0,0.55) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Skew wrapper */}
      <div ref={skewRef} style={{ position: "absolute", inset: 0, zIndex: 2, willChange: "transform" }}>

        {/* Oversized headline — bottom-left, progressive reveal */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            lineHeight: 0.88,
          }}
        >
          {[
            { word: "TRUE", ref: word1Ref },
            { word: "ICE", ref: word2Ref },
            { word: "CREAM", ref: word3Ref },
          ].map(({ word, ref }) => (
            <div
              key={word}
              ref={ref}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 16vw, 14rem)",
                color: "#fff",
                letterSpacing: "0.01em",
                display: "block",
                willChange: "transform, opacity",
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
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
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
                color: "rgba(255,255,255,0.85)",
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

        {/* Scroll-down cue — bottom-right */}
        <button
          ref={scrollBtnRef}
          onClick={scrollToAbout}
          aria-label="Scroll to About"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "2.5rem",
            background: "none",
            border: "1.5px solid rgba(255,255,255,0.45)",
            color: "#fff",
            width: "48px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "24px",
            transition: "border-color 200ms, background 200ms",
            willChange: "transform",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "none";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.45)";
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
        background: "rgba(15,0,0,0.55)",
        backdropFilter: "blur(4px)",
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

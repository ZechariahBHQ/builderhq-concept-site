/* ============================================================
   AboutSection — Warm Organic Editorial
   Left image · right oversized heading + body · floating clouds
   Scroll-triggered reveal via IntersectionObserver
   ============================================================ */
import { useEffect, useRef } from "react";

const ABOUT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/about-ingredients-QZUYhJbc6tyFqMsMuQSjKS.webp";

function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// Decorative cloud SVG
function Cloud({ size = 80, opacity = 0.35 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 120 72"
      fill="none"
      style={{ opacity }}
    >
      <ellipse cx="60" cy="52" rx="58" ry="20" fill="var(--crimson)" />
      <ellipse cx="40" cy="44" rx="28" ry="22" fill="var(--crimson)" />
      <ellipse cx="72" cy="38" rx="32" ry="26" fill="var(--crimson)" />
      <ellipse cx="52" cy="32" rx="22" ry="20" fill="var(--crimson)" />
    </svg>
  );
}

export default function AboutSection() {
  const headRef = useReveal();
  const bodyRef = useReveal(0.12);
  const imgRef = useReveal(0.1);

  return (
    <section
      id="about"
      style={{
        background: "var(--cream)",
        padding: "8rem 0 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative clouds */}
      <div style={{ position: "absolute", top: "6%", right: "8%", pointerEvents: "none" }}>
        <Cloud size={60} opacity={0.18} />
      </div>
      <div style={{ position: "absolute", top: "22%", right: "18%", pointerEvents: "none" }}>
        <Cloud size={100} opacity={0.12} />
      </div>
      <div style={{ position: "absolute", bottom: "12%", left: "5%", pointerEvents: "none" }}>
        <Cloud size={80} opacity={0.14} />
      </div>

      <div className="container">
        {/* Top row: image left + headline right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Image */}
          <div
            ref={imgRef}
            className="reveal"
            style={{ position: "relative" }}
          >
            <img
              src={ABOUT_IMAGE}
              alt="Artisan ice cream popsicles with fresh ingredients"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Small label badge */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "-1rem",
                background: "var(--crimson)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
              }}
            >
              Since 2015
            </div>
          </div>

          {/* Headline + body */}
          <div style={{ paddingTop: "1rem" }}>
            <div
              ref={headRef}
              className="reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              <p
                className="section-label"
                style={{ marginBottom: "1rem" }}
              >
                About the brand
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  color: "var(--crimson)",
                  lineHeight: 0.9,
                  marginBottom: "2rem",
                }}
              >
                THIS IS THE
                <br />
                BRAND.
                <br />
                HE'LL WIN
                <br />
                OVER EVEN
                <br />
                THE SCEPTICS.
              </h2>
            </div>

            <div
              ref={bodyRef}
              className="reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--crimson)",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}
              >
                Those who've tried it already know. Those who haven't — get ready for a flavour that changes everything.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--crimson)",
                  opacity: 0.75,
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}
              >
                Our goal is not just a frozen treat. That would be too simple. We want you to feel something when you take that first bite. It is difficult to do, but we do it.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "var(--crimson)",
                  opacity: 0.75,
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                }}
              >
                We source pistachios from a small farm in Sicily, Alfonso mangoes from India, and chocolate directly from Belgium. Every ingredient is chosen because it is the best — not because it is the easiest.
              </p>
              <a
                href="#about"
                className="btn-outline-crimson"
                style={{ textDecoration: "none" }}
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

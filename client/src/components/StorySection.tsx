/* ============================================================
   StorySection — Warm Organic Editorial
   Dashed SVG bezier path animations · 3-D numeral counters
   Alternating image/text story blocks
   ============================================================ */
import { useEffect, useRef } from "react";

const LIFESTYLE_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/lifestyle-orange-NaiUCsQL8zdqTaFwVBX5zp.webp";

const ABOUT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/about-ingredients-QZUYhJbc6tyFqMsMuQSjKS.webp";

function usePathReveal() {
  const ref = useRef<SVGPathElement>(null);
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function Numeral3D({ n }: { n: string }) {
  return (
    <span
      className="numeral-3d"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(6rem, 14vw, 11rem)",
        lineHeight: 1,
        display: "inline-block",
        userSelect: "none",
      }}
    >
      {n}
    </span>
  );
}

export default function StorySection() {
  const path1Ref = usePathReveal();
  const path2Ref = usePathReveal();
  const block1Ref = useReveal(0.15);
  const block2Ref = useReveal(0.15);

  return (
    <section
      id="story"
      style={{
        background: "var(--cream)",
        padding: "4rem 0 8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Dashed SVG path layer ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "visible",
        }}
        preserveAspectRatio="none"
      >
        <path
          ref={path1Ref}
          d="M 900 80 C 750 120, 650 200, 700 320 C 750 440, 850 480, 780 600 C 710 720, 550 740, 480 820"
          stroke="var(--crimson)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.3"
          className="path-animate"
        />
        <path
          ref={path2Ref}
          d="M 120 300 C 200 360, 300 340, 340 440 C 380 540, 280 620, 360 720 C 440 820, 600 840, 640 940"
          stroke="var(--crimson)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.25"
          className="path-animate"
        />
        {/* Decorative ellipses on path */}
        <ellipse cx="700" cy="320" rx="36" ry="22" stroke="var(--crimson)" strokeWidth="1.2" strokeDasharray="5 4" fill="none" opacity="0.2" />
        <ellipse cx="340" cy="440" rx="28" ry="18" stroke="var(--crimson)" strokeWidth="1.2" strokeDasharray="5 4" fill="none" opacity="0.2" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Block 1: How the idea originated ── */}
        <div
          ref={block1Ref}
          className="reveal story-block"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "3rem 4rem",
            alignItems: "center",
            marginBottom: "8rem",
          }}
        >
          {/* Image */}
          <div style={{ position: "relative" }}>
            <img
              src={LIFESTYLE_IMAGE}
              alt="Person holding an artisan popsicle"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Text + numeral */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <Numeral3D n="01" />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "var(--crimson)",
                lineHeight: 0.9,
                marginBottom: "1.5rem",
              }}
            >
              HOW THE
              <br />
              IDEA
              <br />
              ORIGINATED
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--crimson)",
                opacity: 0.72,
                lineHeight: 1.75,
                maxWidth: "480px",
              }}
            >
              It started with a simple question: why does artisan ice cream always taste better abroad? After years of searching for the answer, we decided to stop looking and start making. We sourced the finest ingredients from around the world and built a production process that refuses to cut corners.
            </p>
          </div>
        </div>

        {/* ── Block 2: How it's made ── */}
        <div
          ref={block2Ref}
          className="reveal story-block"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "3rem 4rem",
            alignItems: "center",
            transitionDelay: "0.15s",
          }}
        >
          {/* Text + numeral */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <Numeral3D n="02" />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "var(--crimson)",
                lineHeight: 0.9,
                marginBottom: "1.5rem",
              }}
            >
              HOW IT'S
              <br />
              MADE
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--crimson)",
                opacity: 0.72,
                lineHeight: 1.75,
                maxWidth: "480px",
                marginBottom: "2rem",
              }}
            >
              Every batch is made by hand in small quantities. We never use artificial flavours, stabilisers, or shortcuts. The mango is pureed fresh. The chocolate is tempered by hand. The pistachio paste is ground on-site. This is what "handcrafted" actually means.
            </p>
            <a href="#about" className="btn-outline-crimson" style={{ textDecoration: "none" }}>
              Full Story
            </a>
          </div>

          {/* Image */}
          <div>
            <img
              src={ABOUT_IMAGE}
              alt="Artisan popsicles with fresh ingredients"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .story-block {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

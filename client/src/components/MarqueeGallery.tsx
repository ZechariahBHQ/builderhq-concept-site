/* ============================================================
   MarqueeGallery — Warm Organic Editorial
   4-column photo mosaic · spinning circular SVG badge
   Curved text "AND WE ARE LAZY-FRIENDLY" arc
   ============================================================ */
import { useEffect, useRef } from "react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/hero-icecream-bhqnanCeVxKP9q5ne6Btww.webp";
const LIFESTYLE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/lifestyle-orange-NaiUCsQL8zdqTaFwVBX5zp.webp";
const ABOUT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/about-ingredients-QZUYhJbc6tyFqMsMuQSjKS.webp";
const CAFE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/partnership-cafe-4xYRQNxnwWL9dn92GcHqEE.webp";

const MOSAIC_IMAGES = [
  { src: LIFESTYLE_IMG, alt: "Person in orange sweater holding popsicle", objectPos: "center top" },
  { src: HERO_IMG, alt: "Woman enjoying artisan ice cream", objectPos: "center 20%" },
  { src: CAFE_IMG, alt: "Artisan ice cream shop interior", objectPos: "center" },
  { src: ABOUT_IMG, alt: "Colourful artisan popsicles flat lay", objectPos: "center" },
];

function SpinningBadge() {
  const TEXT = "DELIVERY AVAILABLE · ORDER ONLINE · GIFT BOXES · ";
  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  return (
    <div
      style={{
        position: "relative",
        width: "130px",
        height: "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Spinning outer ring with text */}
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        className="spin-slow"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <path
            id="badge-circle"
            d={`M 65,65 m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <text
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fill: "var(--crimson)",
          }}
        >
          <textPath href="#badge-circle" startOffset="0%">
            {TEXT}
          </textPath>
        </text>
      </svg>

      {/* Static centre dot */}
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "var(--crimson)",
        }}
      />
    </div>
  );
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function MarqueeGallery() {
  const mosaicRef = useReveal(0.08);
  const badgeRef = useReveal(0.1);

  return (
    <section
      id="gallery"
      style={{ background: "var(--cream)", paddingBottom: "6rem", overflow: "hidden" }}
    >
      {/* ── 4-column mosaic ── */}
      <div
        ref={mosaicRef}
        className="reveal mosaic-strip"
        style={{ marginBottom: "5rem" }}
      >
        {MOSAIC_IMAGES.map((img, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "3/4",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: img.objectPos,
                display: "block",
                transition: "transform 600ms var(--ease-out)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      {/* ── Curved arc text + spinning badge ── */}
      <div className="container">
        <div
          ref={badgeRef}
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            position: "relative",
          }}
        >
          {/* Arc SVG text */}
          <svg
            viewBox="0 0 600 180"
            style={{
              width: "min(600px, 90vw)",
              overflow: "visible",
            }}
            aria-label="And we are delivery-friendly"
          >
            <defs>
              <path
                id="arc-path"
                d="M 30,160 Q 300,-40 570,160"
              />
            </defs>
            {/* Decorative arc fill */}
            <path
              d="M 30,160 Q 300,-40 570,160 Q 300,80 30,160 Z"
              fill="var(--mint)"
              opacity="0.5"
            />
            <text
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fill: "var(--crimson)",
                letterSpacing: "0.04em",
              }}
            >
              <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
                AND WE DELIVER
              </textPath>
            </text>
          </svg>

          {/* Spinning badge */}
          <SpinningBadge />

          {/* Sub-heading */}
          <div style={{ textAlign: "center", maxWidth: "480px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--crimson)",
                lineHeight: 0.95,
                marginBottom: "1rem",
              }}
            >
              LAZY-FRIENDLY
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--crimson)",
                opacity: 0.7,
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Don't want to leave the sofa? We get it. Choose your favourite flavours, select a branded gift box or mixed pack, and we'll bring the good stuff to you.
            </p>
            <button
              className="btn-solid-crimson"
              style={{ padding: "0.85rem 2.5rem" }}
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

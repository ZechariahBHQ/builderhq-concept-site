/* ============================================================
   MarqueeGallery — Warm Organic Editorial
   4-column photo mosaic with staggered reveals · spinning badge
   Curved arc text · transparent background for colour morph
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const HERO_IMG = "/images/hero-icecream.jpg";
const LIFESTYLE_IMG = "/images/lifestyle-orange.jpg";
const ABOUT_IMG = "/images/about-ingredients.jpg";
const CAFE_IMG = "/images/partnership-cafe.jpg";

const MOSAIC_IMAGES = [
  { src: LIFESTYLE_IMG, alt: "Person in orange sweater holding popsicle", objectPos: "center top" },
  { src: HERO_IMG, alt: "Woman enjoying artisan ice cream", objectPos: "center 20%" },
  { src: CAFE_IMG, alt: "Artisan ice cream shop interior", objectPos: "center" },
  { src: ABOUT_IMG, alt: "Colourful artisan popsicles flat lay", objectPos: "center" },
];

function MosaicCell({ img, index }: { img: typeof MOSAIC_IMAGES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        aspectRatio: "3/4",
        overflow: "hidden",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.75s cubic-bezier(0.23,1,0.32,1) ${index * 0.09}s,
                     transform 0.75s cubic-bezier(0.23,1,0.32,1) ${index * 0.09}s`,
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
          transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
      />
    </div>
  );
}

function SpinningBadge() {
  const TEXT = "DELIVERY AVAILABLE · ORDER ONLINE · GIFT BOXES · ";
  const RADIUS = 52;

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
  const badgeRef = useReveal(0.1);

  return (
    <section
      id="gallery"
      style={{ background: "transparent", paddingBottom: "6rem", overflow: "hidden" }}
    >
      {/* ── 4-column staggered mosaic ── */}
      <div
        className="mosaic-strip"
        style={{ marginBottom: "5rem" }}
      >
        {MOSAIC_IMAGES.map((img, i) => (
          <MosaicCell key={i} img={img} index={i} />
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
            aria-label="And we deliver"
          >
            <defs>
              <path
                id="arc-path"
                d="M 30,160 Q 300,-40 570,160"
              />
            </defs>
            <path
              d="M 30,160 Q 300,-40 570,160 Q 300,80 30,160 Z"
              fill="var(--cream-dark)"
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

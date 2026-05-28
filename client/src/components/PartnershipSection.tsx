/* ============================================================
   PartnershipSection — Warm Organic Editorial
   Large partnership image · oversized heading · condition steps
   3-D numeral accent · questionnaire CTA
   ============================================================ */
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const CAFE_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/partnership-cafe-4xYRQNxnwWL9dn92GcHqEE.webp";

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

const STEPS = [
  {
    num: "01",
    title: "WE HAVE SEVERAL CONDITIONS",
    body: "We are open to partnership, but we always visit the location first to see if it is a good fit. No offence intended — sometimes it is just not a match.",
  },
  {
    num: "02",
    title: "DEAL? FILL OUT THE FORM",
    body: "Just a few basic questions that take ten minutes at most. But those ten minutes could be the start of something great.",
  },
  {
    num: "03",
    title: "THEN WAIT FOR OUR LETTER",
    body: "Our team will review your submission and send you full details on pricing, equipment, and the next steps for getting started.",
  },
];

export default function PartnershipSection() {
  const imgRef = useReveal(0.08);
  const headRef = useReveal(0.1);
  const stepsRef = useReveal(0.1);

  return (
    <section
      id="stockists"
      style={{
        background: "var(--cream)",
        padding: "6rem 0 8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">

        {/* ── Top: full-width image with headline overlay ── */}
        <div
          ref={imgRef}
          className="reveal"
          style={{ position: "relative", marginBottom: "5rem" }}
        >
          <img
            src={CAFE_IMAGE}
            alt="Artisan ice cream shop interior — ideal partnership venue"
            style={{
              width: "100%",
              aspectRatio: "21/9",
              objectFit: "cover",
              objectPosition: "center 40%",
              display: "block",
            }}
          />
          {/* Overlay headline */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "3rem clamp(1.5rem, 4vw, 4rem)",
              background:
                "linear-gradient(to top, rgba(247,232,216,0.95) 0%, rgba(247,232,216,0.6) 60%, transparent 100%)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "var(--crimson)",
                lineHeight: 0.88,
                margin: 0,
              }}
            >
              WE LOVE
              <br />
              PARTNERSHIP
            </h2>
          </div>
        </div>

        {/* ── Intro paragraph ── */}
        <div
          ref={headRef}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginBottom: "5rem",
            alignItems: "start",
          }}
          id="partner-intro"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--crimson)",
              opacity: 0.75,
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Picture this: your venue — whether it is a city café, a deli, a bar, or a boutique — already has everything. Almost. It is possible that the one thing missing is us. And that can be fixed.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--crimson)",
              opacity: 0.75,
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            We work with independent venues that share our obsession with quality. We provide the product, the branded equipment, and the ongoing support. You provide the space and the customers.
          </p>
        </div>

        {/* ── Steps with 3-D numerals ── */}
        <div
          ref={stepsRef}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2.5rem",
            marginBottom: "4rem",
            transitionDelay: "0.1s",
          }}
          id="partner-steps"
        >
          {STEPS.map((step) => (
            <div key={step.num} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* 3-D numeral */}
              <span
                className="numeral-3d"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4rem, 8vw, 6.5rem)",
                  lineHeight: 1,
                  display: "block",
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  color: "var(--crimson)",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--crimson)",
                  opacity: 0.7,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTA row ── */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#contact"
            className="btn-solid-crimson"
            style={{ textDecoration: "none", padding: "0.85rem 2.5rem" }}
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Fill Out the Questionnaire
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
          <a
            href="#stockists"
            className="btn-outline-crimson"
            style={{ textDecoration: "none", padding: "0.85rem 2rem" }}
          >
            Where to Buy?
          </a>
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #partner-intro { grid-template-columns: 1fr !important; }
          #partner-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

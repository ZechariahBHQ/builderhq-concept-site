/* ============================================================
   FlavoursSection — Warm Organic Editorial
   Horizontal drag/wheel scroll shelf — cards slide sideways
   Mouse-wheel drives horizontal scroll · click-drag supported
   Progress bar shows position · magnetic "All Flavours" CTA
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { toast } from "sonner";
import { useMagneticButton } from "@/hooks/useMagneticButton";

const PRODUCTS = [
  { id: 1, name: "Raspberry Mochi",     weight: "80g", price: "$8.50", tag: "New",        colour: "#e8b4c0" },
  { id: 2, name: "Mango Passion Fruit", weight: "75g", price: "$8.50", tag: "New",        colour: "#f5d08a" },
  { id: 3, name: "Pistachio Crunch",    weight: "80g", price: "$9.00", tag: "Bestseller", colour: "#b8d4a8" },
  { id: 4, name: "Dark Chocolate",      weight: "75g", price: "$8.50", tag: null,         colour: "#8b6355" },
  { id: 5, name: "Lavender Honey",      weight: "80g", price: "$9.00", tag: null,         colour: "#c8b8d8" },
  { id: 6, name: "Toffee Caramel",      weight: "80g", price: "$8.50", tag: null,         colour: "#d4a870" },
  { id: 7, name: "Plombière Vanilla",   weight: "80g", price: "$8.00", tag: null,         colour: "#f0e0b8" },
  { id: 8, name: "Lemon Cheesecake",    weight: "80g", price: "$9.00", tag: "New",        colour: "#f0e890" },
];

const PRODUCT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482533871/jpQMoZHktxoMSn2wFqYJ4V/about-ingredients-QZUYhJbc6tyFqMsMuQSjKS.webp";

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

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    toast.success(`${product.name} added to cart`, { duration: 2000 });
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "clamp(220px, 22vw, 300px)",
        flexShrink: 0,
        animationDelay: `${index * 60}ms`,
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          background: product.colour,
          overflow: "hidden",
        }}
      >
        <img
          src={PRODUCT_IMAGE}
          alt={product.name}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.85,
            transition: "transform 400ms var(--ease-out)",
            pointerEvents: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
        />
        {product.tag && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              background: "var(--crimson)",
              color: "var(--cream)",
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "0.25rem 0.6rem",
            }}
          >
            {product.tag}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "1rem 1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            color: "var(--crimson)",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {product.name.toUpperCase()}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            color: "var(--crimson)",
            opacity: 0.55,
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          {product.weight}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--crimson)",
            }}
          >
            {product.price}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            style={{
              background: added ? "var(--crimson)" : "transparent",
              border: "1.5px solid var(--crimson)",
              color: added ? "var(--cream)" : "var(--crimson)",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 180ms, color 180ms",
              borderRadius: "0",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!added) {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--crimson)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--cream)";
              }
            }}
            onMouseLeave={(e) => {
              if (!added) {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--crimson)";
              }
            }}
          >
            {added ? <ShoppingBag size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FlavoursSection() {
  const titleRef = useReveal(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const allFlvRef = useMagneticButton<HTMLAnchorElement>(0.35, 75);
  const boxRef = useMagneticButton<HTMLButtonElement>(0.35, 75);

  // Progress 0–1
  const [progress, setProgress] = useState(0);

  // Drag state
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Wheel → horizontal scroll with momentum feel
    const onWheel = (e: WheelEvent) => {
      // Only hijack when section is in view and scroll is mostly horizontal intent
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      // If there's still horizontal scroll room, prevent vertical page scroll
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max && e.deltaY > 0;
      if (!atStart && !atEnd) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
        updateProgress();
      }
    };

    // Pointer drag
    const onPointerDown = (e: PointerEvent) => {
      drag.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft };
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      el.scrollLeft = drag.current.scrollLeft - dx;
      updateProgress();
    };

    const onPointerUp = () => {
      drag.current.active = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [updateProgress]);

  return (
    <section
      id="flavours"
      style={{
        background: "var(--cream)",
        padding: "6rem 0 8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div className="container">
        <div
          ref={titleRef}
          className="reveal"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>
              Our collection
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                color: "var(--crimson)",
                lineHeight: 0.88,
                margin: 0,
              }}
            >
              POPULAR
              <br />
              FLAVOURS
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
            <a
              ref={allFlvRef}
              href="#flavours"
              className="btn-outline-crimson"
              style={{ textDecoration: "none", willChange: "transform" }}
            >
              All Flavours
            </a>
            {/* Drag hint */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                opacity: 0.45,
              }}
            >
              ← drag to explore →
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track — full bleed */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          overflowY: "hidden",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          paddingBottom: "1rem",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`
          #flavours-track::-webkit-scrollbar { display: none; }
        `}</style>
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
        {/* Trailing spacer so last card isn't flush with edge */}
        <div style={{ flexShrink: 0, width: "clamp(1rem, 2vw, 2rem)" }} />
      </div>

      {/* Progress bar */}
      <div className="container">
        <div
          style={{
            marginTop: "2rem",
            height: "1.5px",
            background: "rgba(140,26,26,0.15)",
            position: "relative",
            borderRadius: "1px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress * 100}%`,
              background: "var(--crimson)",
              borderRadius: "1px",
              transition: "width 60ms linear",
            }}
          />
        </div>

        {/* Buy a Box CTA */}
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
          <button
            ref={boxRef}
            className="btn-solid-crimson"
            style={{ padding: "0.85rem 2.5rem", fontSize: "0.8rem", willChange: "transform" }}
            onClick={() => toast.info("Box ordering coming soon!")}
          >
            Buy a Box
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FlavoursSection — Warm Organic Editorial
   Product card grid with hover lift, image, weight, price, CTA
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Plus } from "lucide-react";
import { toast } from "sonner";

const PRODUCTS = [
  { id: 1, name: "Raspberry Mochi", weight: "80g", price: "$8.50", tag: "New", colour: "#e8b4c0" },
  { id: 2, name: "Mango Passion Fruit", weight: "75g", price: "$8.50", tag: "New", colour: "#f5d08a" },
  { id: 3, name: "Pistachio Crunch", weight: "80g", price: "$9.00", tag: "Bestseller", colour: "#b8d4a8" },
  { id: 4, name: "Dark Chocolate", weight: "75g", price: "$8.50", tag: null, colour: "#8b6355" },
  { id: 5, name: "Lavender Honey", weight: "80g", price: "$9.00", tag: null, colour: "#c8b8d8" },
  { id: 6, name: "Toffee Caramel", weight: "80g", price: "$8.50", tag: null, colour: "#d4a870" },
  { id: 7, name: "Plombière Vanilla", weight: "80g", price: "$8.00", tag: null, colour: "#f0e0b8" },
  { id: 8, name: "Lemon Cheesecake", weight: "80g", price: "$9.00", tag: "New", colour: "#f0e890" },
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

  const handleAdd = () => {
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
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Image area */}
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
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.85,
            transition: "transform 400ms var(--ease-out)",
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

      {/* Card body */}
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
              transition: "background 180ms, color 180ms, transform 120ms",
              borderRadius: "0",
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
  const gridRef = useReveal(0.05);

  return (
    <section
      id="flavours"
      style={{
        background: "var(--cream)",
        padding: "6rem 0 8rem",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section header */}
        <div
          ref={titleRef}
          className="reveal"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
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
          <a
            href="#flavours"
            className="btn-outline-crimson"
            style={{ textDecoration: "none", alignSelf: "flex-end" }}
          >
            All Flavours
          </a>
        </div>

        {/* Product grid */}
        <div
          ref={gridRef}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            transitionDelay: "0.1s",
          }}
          id="product-grid"
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Buy a box CTA */}
        <div
          style={{
            marginTop: "3.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="btn-solid-crimson"
            style={{ padding: "0.85rem 2.5rem", fontSize: "0.8rem" }}
            onClick={() => toast.info("Box ordering coming soon!")}
          >
            Buy a Box
          </button>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 1024px) {
          #product-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

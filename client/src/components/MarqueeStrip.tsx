/* ============================================================
   MarqueeStrip — Warm Organic Editorial
   Horizontal scrolling text ticker between sections
   Two rows — one cream-on-crimson, one crimson-on-cream
   ============================================================ */

const ITEMS_TOP = [
  "MANGO PASSION FRUIT",
  "★",
  "PISTACHIO CRUNCH",
  "★",
  "DARK CHOCOLATE",
  "★",
  "LAVENDER HONEY",
  "★",
  "RASPBERRY MOCHI",
  "★",
  "TOFFEE CARAMEL",
  "★",
  "LEMON CHEESECAKE",
  "★",
  "PLOMBIÈRE VANILLA",
  "★",
];

const ITEMS_BOTTOM = [
  "HANDCRAFTED DAILY",
  "·",
  "NATURAL INGREDIENTS",
  "·",
  "SMALL BATCH",
  "·",
  "NO ARTIFICIAL FLAVOURS",
  "·",
  "SINGLE ORIGIN",
  "·",
  "COLD PRESSED",
  "·",
  "ALLERGEN LABELLED",
  "·",
];

interface RowProps {
  items: string[];
  reverse?: boolean;
  bg: string;
  color: string;
  speed?: string;
}

function MarqueeRow({ items, reverse = false, bg, color, speed = "32s" }: RowProps) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        background: bg,
        overflow: "hidden",
        padding: "0.6rem 0",
        borderTop: `1px solid rgba(140,26,26,0.12)`,
        borderBottom: `1px solid rgba(140,26,26,0.12)`,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee-scroll ${speed} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              letterSpacing: "0.12em",
              color,
              whiteSpace: "nowrap",
              padding: "0 1.2rem",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div>
      <MarqueeRow
        items={ITEMS_TOP}
        bg="var(--crimson)"
        color="var(--cream)"
        speed="36s"
      />
      <MarqueeRow
        items={ITEMS_BOTTOM}
        reverse
        bg="var(--cream-dark)"
        color="var(--crimson)"
        speed="28s"
      />
    </div>
  );
}

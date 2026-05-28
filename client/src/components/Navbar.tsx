/* ============================================================
   Navbar — Warm Organic Editorial design system
   Fixed top bar: logo left, outlined buttons right
   Right-side crimson menu drawer with oversized stacked links
   ============================================================ */
import { useState, useEffect } from "react";
import { ShoppingBag, X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Flavours", href: "#flavours" },
  { label: "Stockists", href: "#stockists" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10"
        style={{
          height: "64px",
          background: scrolled ? "rgba(247,232,216,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "background 300ms, backdrop-filter 300ms",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          className="flex flex-col leading-none select-none"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            THE
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.7rem",
              color: "var(--crimson)",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            BRAND
          </span>
          <span
            style={{
              display: "block",
              height: "2px",
              background: "var(--crimson)",
              width: "100%",
              marginTop: "2px",
            }}
          />
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            className="btn-outline-crimson"
            style={{ padding: "0.4rem 0.75rem", gap: "0.4rem" }}
            aria-label="Open cart"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500 }}>
              {cartCount}
            </span>
          </button>

          {/* Flavours shortcut */}
          <button
            className="btn-outline-crimson hidden sm:inline-flex"
            onClick={() => handleNavClick("#flavours")}
            style={{ padding: "0.4rem 1rem" }}
          >
            Flavours
          </button>

          {/* Menu trigger */}
          <button
            className="btn-outline-crimson"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ padding: "0.4rem 0.9rem", gap: "0.5rem" }}
          >
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
              Menu
            </span>
            <Menu size={14} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <nav
        className={`menu-drawer ${menuOpen ? "open" : ""}`}
        aria-label="Site navigation"
      >
        {/* Drawer top bar */}
        <div
          className="flex items-center justify-end px-6 md:px-8"
          style={{ height: "64px", borderBottom: "1px solid rgba(247,232,216,0.15)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex items-center gap-2"
            style={{
              color: "var(--cream)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "none",
              border: "1.5px solid rgba(247,232,216,0.4)",
              padding: "0.4rem 0.9rem",
              cursor: "pointer",
            }}
          >
            Menu <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <ul
          role="menu"
          className="flex flex-col px-8 md:px-12"
          style={{ paddingTop: "2.5rem", gap: "0.25rem", listStyle: "none", margin: 0, padding: "2.5rem 3rem 0" }}
        >
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} role="none">
              <button
                role="menuitem"
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 8vw, 4.5rem)",
                  color: "var(--cream)",
                  lineHeight: 1.0,
                  letterSpacing: "0.04em",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.15rem 0",
                  opacity: 0.9,
                  transition: "opacity 150ms, letter-spacing 150ms",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.08em";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                  (e.currentTarget as HTMLButtonElement).style.letterSpacing = "0.04em";
                }}
              >
                {link.label.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div
          className="px-8 md:px-12"
          style={{
            paddingTop: "3rem",
            paddingBottom: "2.5rem",
            borderTop: "1px solid rgba(247,232,216,0.15)",
            marginTop: "3rem",
          }}
        >
          <div className="flex gap-4">
            {["Instagram", "Facebook", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  color: "rgba(247,232,216,0.6)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(247,232,216,0.6)")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

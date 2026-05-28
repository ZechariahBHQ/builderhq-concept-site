/* ============================================================
   Navbar — Warm Organic Editorial design system
   - Over hero: fully transparent, logo + buttons float with NO background
   - After hero: cream header fades in with blur backdrop
   - Buttons: cream outlined over dark, crimson outlined over light
   ============================================================ */
import { useState, useEffect } from "react";
import { ShoppingBag, X, Menu } from "lucide-react";
import { useMagneticButton } from "@/hooks/useMagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Flavours", href: "#flavours" },
  { label: "Partnership", href: "#partnership" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  // pastHero = true once user has scrolled past the hero section
  const [pastHero, setPastHero] = useState(false);
  const cartRef = useMagneticButton<HTMLButtonElement>(0.72, 120);
  const flavoursRef = useMagneticButton<HTMLButtonElement>(0.72, 120);
  const menuRef = useMagneticButton<HTMLButtonElement>(0.72, 120);

  useEffect(() => {
    const handleScroll = () => {
      // Hero is 100svh tall — switch once we're 90% past it
      setPastHero(window.scrollY > window.innerHeight * 0.9);
    };
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
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 320);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10"
        style={{
          height: "64px",
          // No background at all while over hero — only appears after hero
          background: pastHero ? "rgba(247,232,216,0.94)" : "transparent",
          backdropFilter: pastHero ? "blur(12px)" : "none",
          borderBottom: pastHero ? "1px solid rgba(140,26,26,0.1)" : "none",
          transition: "background 500ms cubic-bezier(0.23,1,0.32,1), backdrop-filter 500ms, border-color 500ms",
        }}
      >
        {/* Logo — cream over hero, crimson after */}
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
              color: pastHero ? "rgba(140,26,26,0.6)" : "rgba(247,232,216,0.7)",
              lineHeight: 1,
              transition: "color 500ms",
            }}
          >
            THE
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.7rem",
              color: pastHero ? "var(--crimson)" : "var(--cream)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              transition: "color 500ms",
            }}
          >
            BRAND
          </span>
          <span
            style={{
              display: "block",
              height: "2px",
              background: pastHero ? "var(--crimson)" : "var(--cream)",
              width: "100%",
              marginTop: "2px",
              transition: "background 500ms",
            }}
          />
        </a>

        {/* Right controls — float with no box over hero */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            ref={cartRef}
            className={pastHero ? "btn-outline-crimson" : "btn-outline-cream"}
            style={{
              padding: "0.4rem 0.75rem",
              gap: "0.4rem",
              willChange: "transform",
              transition: "color 500ms, border-color 500ms, background 180ms",
            }}
            aria-label="Open cart"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 500 }}>
              {cartCount}
            </span>
          </button>

          {/* Flavours shortcut — hidden on mobile */}
          <button
            ref={flavoursRef}
            className={`${pastHero ? "btn-outline-crimson" : "btn-outline-cream"} nav-flavours-btn hidden sm:inline-flex`}
            onClick={() => handleNavClick("#flavours")}
            style={{
              padding: "0.4rem 1rem",
              willChange: "transform",
              transition: "color 500ms, border-color 500ms, background 180ms",
            }}
          >
            Flavours
          </button>

          {/* Menu trigger */}
          <button
            ref={menuRef}
            className={pastHero ? "btn-outline-crimson" : "btn-outline-cream"}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              padding: "0.4rem 0.9rem",
              gap: "0.5rem",
              willChange: "transform",
              transition: "color 500ms, border-color 500ms, background 180ms",
            }}
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
            }}
          >
            Menu <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <ul
          role="menu"
          style={{
            listStyle: "none",
            margin: 0,
            padding: "2.5rem 3rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
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
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.15rem 0",
                  opacity: 0.9,
                  transition: "opacity 150ms, letter-spacing 150ms",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.opacity = "1";
                  el.style.letterSpacing = "0.08em";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.opacity = "0.9";
                  el.style.letterSpacing = "0.04em";
                }}
              >
                {link.label.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div
          style={{
            padding: "3rem 3rem 2.5rem",
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

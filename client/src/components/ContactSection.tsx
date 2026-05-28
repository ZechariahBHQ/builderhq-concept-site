/* ============================================================
   ContactSection — Warm Organic Editorial
   Crimson background · footer form · FAQ accordion · social links
   ============================================================ */
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Send } from "lucide-react";
import { toast } from "sonner";

function useReveal(threshold = 0.12) {
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

const FAQ_ITEMS = [
  {
    q: "Where can I buy your products?",
    a: "Our products are available at select cafés, delis, and boutique food stores across the city. Use the map on our Stockists page to find the nearest location. We also offer direct delivery via our online shop.",
  },
  {
    q: "Do you offer gift boxes?",
    a: "Yes — we offer curated gift boxes in several sizes. You can choose a pre-selected mix or build your own selection. All boxes come in our branded packaging and can include a personalised card.",
  },
  {
    q: "Are your products suitable for people with dietary restrictions?",
    a: "We have options suitable for various dietary needs, including dairy-free and vegan flavours. Each product page lists full ingredients and allergen information. Please contact us directly if you have specific requirements.",
  },
  {
    q: "How do I become a stockist or partner?",
    a: "We love working with independent venues. Fill out our partnership questionnaire and our team will be in touch within a few business days to discuss the next steps.",
  },
];

function FaqItem({ item }: { item: typeof FAQ_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(247,232,216,0.2)",
        paddingBottom: open ? "1.25rem" : "0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          color: "var(--cream)",
          fontFamily: "var(--font-body)",
          fontSize: "0.9rem",
          fontWeight: 500,
          textAlign: "left",
          padding: "1.25rem 0",
          cursor: "pointer",
          gap: "1rem",
        }}
      >
        <span>{item.q}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms var(--ease-out)",
            color: "rgba(247,232,216,0.6)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 350ms var(--ease-out)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "rgba(247,232,216,0.7)",
            lineHeight: 1.75,
            margin: 0,
            paddingBottom: "0.5rem",
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const formRef = useReveal(0.1);
  const faqRef = useReveal(0.1);

  const [form, setForm] = useState({
    subject: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ subject: "", city: "", name: "", phone: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--crimson)",
        padding: "7rem 0 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative large background numeral */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-2rem",
          right: "-1rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(12rem, 28vw, 22rem)",
          color: "rgba(247,232,216,0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ?
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section heading ── */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(247,232,216,0.5)",
              marginBottom: "1rem",
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "var(--cream)",
              lineHeight: 0.88,
              margin: 0,
            }}
          >
            LET'S TALK
          </h2>
        </div>

        {/* ── Two-column: form left, FAQ right ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          id="contact-grid"
        >
          {/* Contact form */}
          <div ref={formRef} className="reveal">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {/* Subject select */}
              <div style={{ position: "relative", marginBottom: "0.25rem" }}>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1.5px solid rgba(247,232,216,0.3)",
                    color: form.subject ? "var(--cream)" : "rgba(247,232,216,0.4)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.75rem 0",
                    width: "100%",
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled>Subject of enquiry *</option>
                  <option value="partnership">Partnership / Stockist</option>
                  <option value="order">Order enquiry</option>
                  <option value="press">Press &amp; media</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown
                  size={14}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(247,232,216,0.4)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {[
                { name: "city", placeholder: "City *", type: "text" },
                { name: "name", placeholder: "Your name *", type: "text" },
                { name: "phone", placeholder: "Phone number", type: "tel" },
                { name: "email", placeholder: "Email address *", type: "email" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(form as Record<string, string>)[field.name]}
                  onChange={handleChange}
                  className="form-input"
                  style={{ marginBottom: "0.25rem" }}
                />
              ))}

              <textarea
                name="message"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid rgba(247,232,216,0.3)",
                  color: "var(--cream)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  padding: "0.75rem 0",
                  width: "100%",
                  outline: "none",
                  resize: "none",
                  marginBottom: "2rem",
                }}
                className="form-input"
              />

              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  background: "var(--cream)",
                  color: "var(--crimson)",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.85rem 2rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 180ms, color 180ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(247,232,216,0.85)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--cream)";
                }}
              >
                Send <Send size={13} strokeWidth={1.5} />
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div ref={faqRef} className="reveal" style={{ transitionDelay: "0.12s" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--cream)",
                lineHeight: 1,
                marginBottom: "1.5rem",
              }}
            >
              FREQUENTLY ASKED
            </h3>
            <div>
              {FAQ_ITEMS.map((item) => (
                <FaqItem key={item.q} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(247,232,216,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Logo text */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                color: "var(--cream)",
                letterSpacing: "0.06em",
              }}
            >
              THE BRAND
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                color: "rgba(247,232,216,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "0.2rem",
              }}
            >
              © {new Date().getFullYear()} — All rights reserved
            </span>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Instagram", "Facebook", "TikTok", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  color: "rgba(247,232,216,0.5)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(247,232,216,0.5)")}
              >
                {s}
              </a>
            ))}
          </div>

          {/* Legal */}
          <a
            href="#"
            style={{
              color: "rgba(247,232,216,0.35)",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </a>
        </div>

      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

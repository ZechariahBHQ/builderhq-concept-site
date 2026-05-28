/* ============================================================
   Home — Warm Organic Editorial template
   Assembles all sections in order with custom cursor
   data-fall-target marks elements that fall away during
   the Flavours takeover sequence
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsStrip from "@/components/StatsStrip";
import FlavoursSection from "@/components/FlavoursSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import StorySection from "@/components/StorySection";
import MarqueeGallery from "@/components/MarqueeGallery";
import PartnershipSection from "@/components/PartnershipSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import RippleEffect from "@/components/RippleEffect";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <div
      style={{
        background: "var(--cream)",
        minHeight: "100vh",
        cursor: "none",
      }}
    >
      <PageTransition />
      <CustomCursor />
      <RippleEffect />
      <div data-fall-target="navbar"><Navbar /></div>
      <div data-fall-target="hero"><HeroSection /></div>
      <div data-fall-target="about"><AboutSection /></div>
      <div data-fall-target="stats"><StatsStrip /></div>
      <div data-fall-target="flavours"><FlavoursSection /></div>
      <div data-fall-target="marquee"><MarqueeStrip /></div>
      <div data-fall-target="story"><StorySection /></div>
      <div data-fall-target="gallery"><MarqueeGallery /></div>
      <div data-fall-target="partnership"><PartnershipSection /></div>
      <div data-fall-target="contact"><ContactSection /></div>
    </div>
  );
}

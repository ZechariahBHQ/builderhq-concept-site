/* ============================================================
   Home — Warm Organic Editorial template
   Assembles all sections in order with custom cursor
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
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsStrip />
      <FlavoursSection />
      <MarqueeStrip />
      <StorySection />
      <MarqueeGallery />
      <PartnershipSection />
      <ContactSection />
    </div>
  );
}

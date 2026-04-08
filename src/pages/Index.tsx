import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import WhyUsSection from "@/components/WhyUsSection";
import RewardsSection from "@/components/RewardsSection";
import DocumentsSection from "@/components/DocumentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FleetSection />
    <WhyUsSection />
    <DocumentsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;

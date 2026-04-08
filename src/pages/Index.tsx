import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingBar from "@/components/BookingBar";
import TrustBar from "@/components/TrustBar";
import RewardsSection from "@/components/RewardsSection";
import FleetSection from "@/components/FleetSection";
import HowItWorks from "@/components/HowItWorks";
import PromosSection from "@/components/PromosSection";
import WhyUsSection from "@/components/WhyUsSection";
import DocumentsSection from "@/components/DocumentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <BookingBar />
    <TrustBar />
    <RewardsSection />
    <FleetSection />
    <HowItWorks />
    <PromosSection />
    <WhyUsSection />
    <DocumentsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;

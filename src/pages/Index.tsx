import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookingBar from "@/components/BookingBar";
import TrustBar from "@/components/TrustBar";
import HomeFeaturedCars from "@/components/HomeFeaturedCars";
import WhyAlEmadBanner from "@/components/WhyAlEmadBanner";
import HowItWorks from "@/components/HowItWorks";
import DocumentsSection from "@/components/DocumentsSection";
import PromosSection from "@/components/PromosSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";

const Index = () => (
  <div className="min-h-screen bg-background">
    <CursorTrail />
    <Navbar />
    <HeroSection />
    <BookingBar />
    <TrustBar />
    <HomeFeaturedCars />
    <WhyAlEmadBanner />
    <HowItWorks />
    <PromosSection />
    <TestimonialsSection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;

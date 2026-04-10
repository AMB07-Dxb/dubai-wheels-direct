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
import BlogPreviewSection from "@/components/BlogPreviewSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import SEOHead from "@/components/SEOHead";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Al Emad Rent A Car",
  url: "https://dubai-wheels-direct.lovable.app",
  telephone: "+971-4-557-3386",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
    streetAddress: "JLT, Platinum Tower",
  },
  priceRange: "AED 50 - AED 500/day",
  areaServed: "Dubai, UAE",
  description: "Rent economy to luxury cars in Dubai with Al Emad. Daily, weekly & monthly rentals with free insurance, maintenance & delivery.",
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Al Emad Rent A Car Dubai | Cheapest Car Rental from AED 50/day"
      description="Rent economy to luxury cars in Dubai with Al Emad. 900+ vehicles, daily/weekly/monthly rentals with free insurance, maintenance & delivery. Book now!"
      canonical="https://dubai-wheels-direct.lovable.app"
      jsonLd={jsonLd}
    />
    <CursorTrail />
    <Navbar />
    <HeroSection />
    <BookingBar />
    <TrustBar />
    <HomeFeaturedCars />
    <WhyAlEmadBanner />
    <HowItWorks />
    <DocumentsSection />
    <PromosSection />
    <TestimonialsSection />
    <BlogPreviewSection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;

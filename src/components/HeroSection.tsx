import heroBg from "@/assets/hero-dubai.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Luxury cars on Dubai highway at sunset" className="absolute inset-0 w-full h-full object-cover scale-105" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 container text-center max-w-4xl mx-auto px-4 pt-20">
        <div className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-1.5 mb-6 animate-fade-up">
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-primary-foreground">
            Dubai's Trusted Car Rental
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up text-primary-foreground" style={{ animationDelay: "0.1s" }}>
          Best Cars. Best Prices.
          <br />
          <span className="text-primary">Zero Hassle.</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up text-primary-foreground/75 leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Economy to luxury — daily, weekly & monthly rentals across Dubai.
          <br className="hidden md:block" />
          Insurance, maintenance & delivery included.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a href="#fleet">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 gap-2 w-full sm:w-auto shadow-lg shadow-primary/25">
              Browse Fleet <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 gap-2 w-full sm:w-auto backdrop-blur-sm">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </Button>
          </a>
        </div>

        {/* Price badge */}
        <div className="mt-16 inline-flex items-center gap-8 bg-black/40 backdrop-blur-xl rounded-2xl px-10 py-6 border border-white/10 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <PricePill label="Daily" price="60" />
          <div className="w-px h-12 bg-white/15" />
          <PricePill label="Weekly" price="385" />
          <div className="w-px h-12 bg-white/15" />
          <PricePill label="Monthly" price="1,350" />
        </div>
        <p className="text-xs mt-4 animate-fade-up text-primary-foreground/40" style={{ animationDelay: "0.6s" }}>
          Starting from • 5% VAT applicable
        </p>
      </div>
    </section>
  );
};

const PricePill = ({ label, price }: { label: string; price: string }) => (
  <div className="text-center">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50 mb-1">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-primary-foreground">
      <span className="text-xs font-normal text-primary-foreground/50">AED </span>{price}
    </p>
  </div>
);

export default HeroSection;

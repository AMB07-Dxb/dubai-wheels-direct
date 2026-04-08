import heroBg from "@/assets/hero-dubai.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Luxury cars on Dubai highway at sunset" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(0,0%,0%,0.75) 0%, hsla(0,0%,0%,0.35) 100%)" }} />

      <div className="relative z-10 container text-center max-w-4xl mx-auto px-4 pt-20">
        <p className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-gold mb-4 animate-fade-up">Dubai's Trusted Car Rental</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-up text-primary-foreground" style={{ animationDelay: "0.15s" }}>
          Best Cars. Best Prices.<br />
          <span className="text-primary">Zero Hassle.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up text-primary-foreground/80" style={{ animationDelay: "0.3s" }}>
          Economy to luxury — daily, weekly & monthly rentals across Dubai. Insurance, maintenance & delivery included.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <a href="#fleet">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 gap-2 w-full sm:w-auto">
              Browse Fleet <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 gap-2 w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </Button>
          </a>
        </div>

        {/* Price badge */}
        <div className="mt-16 inline-flex items-center gap-6 bg-surface-dark/60 backdrop-blur-md rounded-2xl px-8 py-5 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <PricePill label="Daily" price="60" />
          <div className="w-px h-10 bg-primary-foreground/20" />
          <PricePill label="Weekly" price="385" />
          <div className="w-px h-10 bg-primary-foreground/20" />
          <PricePill label="Monthly" price="1,350" />
        </div>
        <p className="text-xs mt-3 animate-fade-up text-primary-foreground/50" style={{ animationDelay: "0.7s" }}>Starting from • 5% VAT applicable</p>
      </div>
    </section>
  );
};

const PricePill = ({ label, price }: { label: string; price: string }) => (
  <div className="text-center">
    <p className="text-xs font-medium uppercase tracking-wider text-primary-foreground/60">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-primary-foreground">
      <span className="text-sm font-normal text-primary-foreground/60">AED </span>{price}
    </p>
  </div>
);

export default HeroSection;

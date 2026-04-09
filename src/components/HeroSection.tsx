import heroCar from "@/assets/hero-car.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-surface-dark">
      {/* Abstract geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/5 clip-diagonal" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-xs font-bold tracking-wide uppercase text-primary-foreground">Limited Offer — Rent 5 Days, Get 2 Free!</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-5 text-primary-foreground">
              Best Cars.
              <br />
              Best Prices.
              <br />
              <span className="text-primary">Zero Hassle.</span>
            </h1>

            <p className="text-base md:text-lg max-w-lg mb-8 text-primary-foreground/60 leading-relaxed">
              Economy to luxury — daily, weekly & monthly rentals across Dubai.
              Insurance, maintenance & delivery included.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link to="/fleet">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 gap-2 w-full sm:w-auto shadow-lg shadow-primary/30 h-12">
                  Browse Fleet <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 gap-2 w-full sm:w-auto backdrop-blur-sm h-12">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-6 bg-black/30 backdrop-blur-xl rounded-2xl px-8 py-5 border border-white/10 w-fit">
              <PricePill label="Daily" price="50" />
              <div className="w-px h-10 bg-white/15" />
              <PricePill label="Weekly" price="315" />
              <div className="w-px h-10 bg-white/15" />
              <PricePill label="Monthly" price="990" />
            </div>
            <p className="text-[10px] mt-2 text-primary-foreground/35 ml-1">Starting from • 5% VAT applicable</p>
          </div>

          <div className="hidden lg:flex items-end justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img src={heroCar} alt="Premium car available for rent" className="w-full max-w-xl drop-shadow-2xl" width={1024} height={640} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }} />
    </section>
  );
};

const PricePill = ({ label, price }: { label: string; price: string }) => (
  <div className="text-center">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50 mb-1">{label}</p>
    <p className="text-xl md:text-2xl font-bold text-primary-foreground">
      <span className="text-[10px] font-normal text-primary-foreground/50">AED </span>{price}
    </p>
  </div>
);

export default HeroSection;

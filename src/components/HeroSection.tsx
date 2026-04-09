import heroCar from "@/assets/hero-car.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Subtle accent shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-muted rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-primary">Rent 5 Days, Get 2 Free</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6 text-foreground">
              Premium Cars.
              <br />
              <span className="text-primary">Best Prices.</span>
            </h1>

            <p className="text-lg max-w-md mb-10 text-muted-foreground leading-relaxed">
              Economy to luxury — daily, weekly & monthly rentals across Dubai.
              Insurance, delivery & maintenance included.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link to="/fleet">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 gap-2 w-full sm:w-auto h-13 rounded-xl shadow-lg shadow-primary/20">
                  Browse Fleet <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-foreground/15 text-foreground hover:bg-muted text-base px-8 gap-2 w-full sm:w-auto h-13 rounded-xl">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 bg-muted rounded-2xl px-8 py-6 w-fit">
              <PricePill label="Daily" price="50" />
              <div className="w-px h-10 bg-border" />
              <PricePill label="Weekly" price="315" />
              <div className="w-px h-10 bg-border" />
              <PricePill label="Monthly" price="990" />
            </div>
            <p className="text-[11px] mt-3 text-muted-foreground ml-1">Starting from • 5% VAT applicable</p>
          </div>

          <div className="hidden lg:flex items-center justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img src={heroCar} alt="Premium car available for rent" className="w-full max-w-xl drop-shadow-2xl" width={1024} height={640} />
          </div>
        </div>
      </div>
    </section>
  );
};

const PricePill = ({ label, price }: { label: string; price: string }) => (
  <div className="text-center">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-foreground">
      <span className="text-[10px] font-normal text-muted-foreground">AED </span>{price}
    </p>
  </div>
);

export default HeroSection;

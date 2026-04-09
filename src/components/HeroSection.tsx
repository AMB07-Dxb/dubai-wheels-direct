import { useState, useEffect } from "react";
import heroCar1 from "@/assets/hero-car-1.png";
import heroCar2 from "@/assets/hero-car-2.png";
import heroCar3 from "@/assets/hero-car-3.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const heroSlides = [
  { image: heroCar1, label: "Economy" },
  { image: heroCar2, label: "SUV" },
  { image: heroCar3, label: "Luxury" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

          {/* Car slideshow */}
          <div className="hidden lg:flex flex-col items-center justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full max-w-xl h-[400px]">
              {heroSlides.map((slide, i) => (
                <img
                  key={i}
                  src={slide.image}
                  alt={`${slide.label} car available for rent`}
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out drop-shadow-2xl"
                  style={{
                    opacity: current === i ? 1 : 0,
                    transform: current === i ? "translateX(0) scale(1)" : "translateX(40px) scale(0.95)",
                  }}
                  width={1024}
                  height={640}
                />
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-3 mt-6">
              {heroSlides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="flex items-center gap-2 group"
                >
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: current === i ? "32px" : "12px",
                      backgroundColor: current === i ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                  />
                  {current === i && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {slide.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
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

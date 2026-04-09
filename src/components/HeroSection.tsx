import { useState, useEffect, useCallback } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import peugeot3008Img from "@/assets/peugeot-3008.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1140_201.png",
    category: "Sedan",
    title: "Affordable Daily Rentals",
    subtitle: "From AED 90/day",
    desc: "The all-new Mazda 3 2025 — stylish, fuel-efficient, and perfect for Dubai city driving.",
  },
  {
    image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1133_312.png",
    category: "Economy",
    title: "Smart & Economical",
    subtitle: "From AED 80/day",
    desc: "Geely Emgrand 2025 — a spacious, modern sedan at unbeatable rates with full insurance.",
  },
  {
    image: "https://www.pngmart.com/files/22/Hyundai-Santa-Fe-PNG-Isolated-HD.png",
    category: "SUV",
    title: "Spacious Family SUVs",
    subtitle: "From AED 170/day",
    desc: "Hyundai SantaFe 2022 — 7-seater comfort for family trips and weekend adventures.",
  },
  {
    image: "https://www.caryaati.com/erps/admin/images/model/model_sp_620_819.png",
    category: "SUV",
    title: "Turbocharged Compact SUV",
    subtitle: "From AED 120/day",
    desc: "Kia Seltos 2023 — turbocharged performance, dual screens, and bold design for Dubai roads.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Fixed background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left: Text */}
          <div className="text-white">
            {/* Category badge */}
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 bg-primary rounded-full px-4 py-1.5 mb-6 animate-fade-up"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-white">{slides[current].category}</span>
            </div>

            <h1
              key={`title-${current}`}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-4 text-white animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Premium Cars.
              <br />
              <span className="text-primary">Best Prices.</span>
            </h1>

            <p
              key={`subtitle-${current}`}
              className="text-xl md:text-2xl font-semibold text-white/90 mb-2 animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {slides[current].subtitle}
            </p>

            <p
              key={`desc-${current}`}
              className="text-base max-w-md mb-8 text-white/60 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {slides[current].desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
              <Link to="/fleet">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-base px-8 gap-2 w-full sm:w-auto h-13 rounded-xl shadow-lg font-semibold">
                  Browse Fleet <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-base px-8 gap-2 w-full sm:w-auto h-13 rounded-xl shadow-lg font-semibold">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
            </div>

            {/* Price pills */}
            <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 w-fit border border-white/10">
              <PricePill label="Daily" price="50" />
              <div className="w-px h-10 bg-white/20" />
              <PricePill label="Weekly" price="315" />
              <div className="w-px h-10 bg-white/20" />
              <PricePill label="Monthly" price="990" />
            </div>
            <p className="text-[11px] mt-2 text-white/40 ml-1">Starting from • 5% VAT applicable</p>
          </div>

          {/* Right: Car image */}
          <div className="hidden lg:flex items-center justify-center relative h-[450px] translate-y-10">
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.image}
                alt={`${slide.category} car for rent`}
                className="absolute max-w-[580px] w-full h-[300px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out"
                style={{
                  opacity: current === i ? 1 : 0,
                  transform: current === i
                    ? "translateX(0) scale(1)"
                    : i > current
                      ? "translateX(80px) scale(0.9)"
                      : "translateX(-80px) scale(0.9)",
                }}
                width={1024}
                height={640}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative"
          >
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: current === i ? "40px" : "12px",
                backgroundColor: current === i ? "hsl(var(--primary))" : "rgba(255,255,255,0.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

const PricePill = ({ label, price }: { label: string; price: string }) => (
  <div className="text-center">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-1">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-white">
      <span className="text-[10px] font-normal text-white/50">AED </span>{price}
    </p>
  </div>
);

export default HeroSection;

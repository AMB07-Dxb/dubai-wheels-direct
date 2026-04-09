import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  { name: "Omar K., Saudi Arabia", car: "Mercedes E 200 2025", text: "This rental experience stood out from all previous car rentals I have used as the best one. No hidden fees, easy booking, and great vehicle options. The staff were incredibly helpful and made the whole process seamless.", initial: "O", source: "google" },
  { name: "Aisha M., UAE", car: "Bentley Bentayga S V8 2025", text: "The team assisted me to find the perfect car rent in Dubai plan. This entire rental experience worked without any problems as the vehicle arrived in flawless condition. Highly recommend their premium fleet.", initial: "A", source: "trustpilot" },
  { name: "James R., UAE", car: "Peugeot 5008 2025", text: "Renting a car was so easy! I experienced a rapid booking process from them that led to direct car delivery at my hotel. And their car rental prices in Dubai were better than I expected. Excellent service all around.", initial: "J", source: "reviews" },
  { name: "Mitch Noblesa", car: "Toyota Camry 2024", text: "The best car rental in UAE. Car units are excellent as well as the service and hospitality of the staff. Highly recommended for people looking to rent a car. More power to your company Al Emad and thanks to the team.", initial: "M", source: "google" },
  { name: "Elena Petrova", car: "Nissan Kicks 2024", text: "I've rented cars in many countries, but this was one of my best experiences. The prices were unbeatable for Dubai, and the car I got was spotless and modern. Highly recommended for tourists who don't want to overspend on transport.", initial: "E", source: "trustpilot" },
  { name: "Sarah Thompson", car: "Kia Seltos 2023", text: "I was in Dubai for a quick business trip and needed a reliable car on a budget. Al Emad exceeded my expectations — the car was clean, well maintained, and the pick up process was incredibly smooth. Will use again!", initial: "S", source: "google" },
];

const sourceIcons: Record<string, { label: string; color: string }> = {
  google: { label: "G", color: "text-[#4285F4]" },
  trustpilot: { label: "★", color: "text-[#00B67A]" },
  reviews: { label: "★", color: "text-[#0CAFFF]" },
};

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Auto-slide
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground uppercase">What Our Customers Say</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#4285F4]">G</span>
              <span className="font-semibold text-foreground">Google</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#00B67A] fill-[#00B67A]" />
              <span className="font-semibold text-foreground">Trustpilot</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-6">
              {testimonials.map((t, i) => {
                const src = sourceIcons[t.source];
                return (
                  <div key={i} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pl-6">
                    <div className="rounded-2xl border border-border bg-muted/30 p-6 h-full flex flex-col">
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {t.initial}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm uppercase tracking-wide">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.car}</p>
                          </div>
                        </div>
                        <span className={`text-xl font-bold ${src.color}`}>{src.label}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

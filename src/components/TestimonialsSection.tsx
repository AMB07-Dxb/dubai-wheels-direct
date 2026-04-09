import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  { name: "Omar K., Saudi Arabia", car: "Toyota Corolla 2024", text: "Rented the Corolla for two weeks while visiting family in Dubai. The car was delivered right to my hotel lobby within an hour of booking. Fuel-efficient, comfortable, and the AC worked perfectly even in 45°C heat. No surprise charges at return.", initial: "O", source: "google" },
  { name: "Aisha M., UAE", car: "Nissan Kicks 2024", text: "Needed a compact SUV for daily commutes while my car was being serviced. The Kicks they gave me was practically brand new — less than 5,000 km on it. Smooth handover, fair pricing, and the team even reminded me about toll registration. Very thoughtful.", initial: "A", source: "trustpilot" },
  { name: "James R., UK", car: "Hyundai Tucson 2024", text: "First time renting in the UAE and I was a bit nervous about the process. The staff walked me through everything, explained the insurance coverage, and had the Tucson ready with a full tank. Drove it across Dubai and Abu Dhabi with zero issues.", initial: "J", source: "reviews" },
  { name: "Mitch Noblesa", car: "Kia Seltos 2023", text: "I've used three different rental companies in Dubai before switching to Al Emad. The difference is night and day — their cars are genuinely well maintained, not just washed on the outside. My Seltos drove like it just came off the lot.", initial: "M", source: "google" },
  { name: "Elena Petrova", car: "MG ZS 2024", text: "Booked the MG ZS for a month-long stay and the monthly rate saved me a fortune compared to taxis. Clean interior, responsive steering, and the free delivery to Dubai Marina was a huge bonus. Already rebooked for my next trip.", initial: "E", source: "trustpilot" },
  { name: "Sarah Thompson", car: "Mitsubishi ASX 2024", text: "Picked up the ASX for a weekend trip to Hatta with friends. Plenty of boot space for our gear, the car handled the mountain roads well, and returning it at a different location was no hassle at all. Genuinely impressed.", initial: "S", source: "google" },
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
    <section className="pt-16 pb-8 bg-background relative overflow-hidden">
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

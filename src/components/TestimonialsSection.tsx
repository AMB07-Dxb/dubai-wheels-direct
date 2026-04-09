import { useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Mitch Noblesa", date: "14-02-2025", text: "The best car rental in UAE. Car units are excellent as well as the service and hospitality of the staff. Highly recommended for people looking to rent a car. More power to your company Al Emad and thanks to the team." },
  { name: "Elena Petrova", date: "14-09-2024", text: "I've rented cars in many countries, but this was one of my best experiences. The prices were unbeatable for Dubai, and the car I got was spotless and modern. Highly recommended for tourists who don't want to overspend on transport." },
  { name: "Sarah Thompson", date: "23-12-2024", text: "I was in Dubai for a quick business trip and needed a reliable car on a budget. Al Emad exceeded my expectations — the car was clean, well maintained, and the pick up process was incredibly smooth." },
  { name: "Ahmed", date: "20-04-2025", text: "I needed a second car while mine was in the shop, and these guys delivered right to my doorstep. Great pricing, no hidden fees, and the staff was very polite. I'll definitely be using them again." },
  { name: "Jessica Ramirez", date: "14-05-2025", text: "As a solo traveler, I appreciated how easy it was to book online and get support when I landed in Dubai. The economy car I rented was fuel efficient and perfect for city driving. Customer service was responsive and helpful throughout." },
];

const TestimonialsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl border bg-background transition-all duration-400 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderColor: hovered === i ? "hsl(var(--primary) / 0.25)" : "hsl(var(--border))",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                boxShadow: hovered === i ? "0 25px 60px -15px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.03)",
              }}
            >
              <Quote className={`w-8 h-8 mb-4 transition-colors duration-300 ${hovered === i ? "text-primary" : "text-muted-foreground/30"}`} />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm font-sans">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

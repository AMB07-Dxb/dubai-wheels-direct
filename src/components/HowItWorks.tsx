import { useState } from "react";
import { Search, CreditCard, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse Our Fleet",
    short: "Explore vehicles at transparent prices.",
    full: "Choose from 45+ vehicles across economy, sedan, SUV, and luxury categories. Filter by brand, price, or type. Every car shows daily, weekly, and monthly rates upfront — no hidden fees.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Book Your Car",
    short: "Pick your plan and confirm instantly.",
    full: "Select daily, weekly, or monthly rental. Provide your documents and preferred pickup location. Our team processes your request within minutes via WhatsApp or phone.",
  },
  {
    icon: Car,
    step: "03",
    title: "Pick Up or We Deliver",
    short: "Free delivery anywhere in Dubai.",
    full: "Collect from our JLT office or we deliver to your hotel, airport, or home — completely free within Dubai. All vehicles are cleaned, fueled, and inspected before handover.",
  },
];

const HowItWorks = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-28 bg-muted/30 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Book in 3 Easy Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
              )}

              <div
                className="rounded-3xl p-10 transition-all duration-500 border bg-background"
                style={{
                  borderColor: hovered === i ? "hsl(0 85% 50% / 0.25)" : "hsl(0 0% 92%)",
                  boxShadow: hovered === i ? "0 25px 60px -15px rgba(220,38,38,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transform: hovered === i ? "translateY(-10px)" : "translateY(0)",
                }}
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-8 relative transition-colors duration-300"
                  style={{ backgroundColor: hovered === i ? "hsl(0 85% 50% / 0.12)" : "hsl(0 85% 50% / 0.06)" }}>
                  <s.icon className={`w-8 h-8 transition-colors duration-300 ${hovered === i ? "text-primary" : "text-primary/60"}`} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg">{s.step}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 font-sans text-center">{s.title}</h3>

                <div className="text-center overflow-hidden transition-all duration-500" style={{ maxHeight: hovered === i ? "200px" : "48px" }}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hovered === i ? s.full : s.short}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

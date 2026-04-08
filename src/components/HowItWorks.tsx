import { Search, CreditCard, Car } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Browse Our Fleet", desc: "Explore a wide range of vehicles from economy to luxury, all at transparent pricing." },
  { icon: CreditCard, step: "02", title: "Book Your Car", desc: "Choose your plan — daily, weekly, or monthly. Our team processes your request instantly." },
  { icon: Car, step: "03", title: "Pick Up or We Deliver", desc: "Collect from our location or get your car delivered anywhere in Dubai — free of charge." },
];

const HowItWorks = () => (
  <section className="py-16 bg-background">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">How It Works</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Book in 3 Easy Steps</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.step} className="relative text-center group">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-primary/20" />
            )}
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 relative group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-8 h-8 text-primary" />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">{s.step}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;

import { Shield, Clock, MapPin, Wrench, CreditCard, Headphones } from "lucide-react";

const features = [
  { icon: Shield, title: "Full Insurance", desc: "Comprehensive coverage included with every rental — drive worry-free." },
  { icon: Clock, title: "24/7 Availability", desc: "Book anytime, pick up anytime. We're always ready when you are." },
  { icon: MapPin, title: "Free Delivery", desc: "We deliver your car anywhere in Dubai at no extra charge." },
  { icon: Wrench, title: "Free Maintenance", desc: "All servicing and maintenance costs are on us during your rental." },
  { icon: CreditCard, title: "Flexible Payments", desc: "Pay by credit card, debit card, or cash — whatever suits you." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our team is one call away for any assistance you need." },
];

const WhyUsSection = () => (
  <section id="why-us" className="section-padding bg-surface-dark">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Why Choose Us</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-surface-dark-foreground">The Al Emad Advantage</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="group bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 rounded-xl p-6 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-surface-dark-foreground mb-2 font-sans">{f.title}</h3>
            <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;

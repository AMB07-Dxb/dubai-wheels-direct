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
  <section id="why-us" className="section-padding bg-surface-dark relative overflow-hidden">
    {/* Decorative gradient orb */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

    <div className="container relative">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Why Choose Us</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-surface-dark-foreground">The Al Emad Advantage</h2>
        <p className="text-surface-dark-foreground/50 mt-3 max-w-lg mx-auto">Everything you need for a seamless rental experience in Dubai.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-surface-dark-foreground mb-2 font-sans">{f.title}</h3>
            <p className="text-sm text-surface-dark-foreground/50 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;

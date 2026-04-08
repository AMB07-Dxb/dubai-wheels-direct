import { Button } from "@/components/ui/button";
import { Tag, Percent, Gift } from "lucide-react";

const promos = [
  {
    icon: Gift,
    tag: "Limited Time",
    title: "Rent 5 Days, Get 2 Days FREE",
    desc: "Book any car for 5 days and enjoy 2 additional days absolutely free. Perfect for weekly trips around Dubai.",
    cta: "Book Now",
    accent: "from-primary to-primary/80",
  },
  {
    icon: Percent,
    tag: "Monthly Deal",
    title: "15% OFF Monthly Rentals",
    desc: "Save big on long-term rentals. Get 15% off when you book any vehicle for a full month or more.",
    cta: "Claim Offer",
    accent: "from-amber-500 to-amber-600",
  },
  {
    icon: Tag,
    tag: "New Customers",
    title: "First Rental? Get AED 50 Off",
    desc: "Welcome to Al Emad! Use your first-time discount on any car in our fleet. No minimum booking required.",
    cta: "Get Discount",
    accent: "from-emerald-500 to-emerald-600",
  },
];

const PromosSection = () => (
  <section id="promos" className="section-padding bg-muted/30">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Special Offers</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Exclusive Deals for You</h2>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Take advantage of our limited-time promotions and save on your next rental.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {promos.map((p) => (
          <div key={p.title} className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift flex flex-col">
            <div className={`bg-gradient-to-r ${p.accent} px-6 py-4 flex items-center gap-3`}>
              <p.icon className="w-5 h-5 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">{p.tag}</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2 font-sans">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.desc}</p>
              <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm">
                  {p.cta}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PromosSection;

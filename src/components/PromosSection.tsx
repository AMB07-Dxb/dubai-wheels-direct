import { Button } from "@/components/ui/button";
import { Tag, Percent, Gift } from "lucide-react";

const promos = [
  {
    icon: Gift,
    tag: "Limited Time",
    title: "Rent 5 Days, Get 2 Days FREE",
    desc: "Book any car for 5 days and enjoy 2 additional days absolutely free. Perfect for weekly trips around Dubai.",
    cta: "Book Now",
  },
  {
    icon: Percent,
    tag: "Monthly Deal",
    title: "15% OFF Monthly Rentals",
    desc: "Save big on long-term rentals. Get 15% off when you book any vehicle for a full month or more.",
    cta: "Claim Offer",
  },
  {
    icon: Tag,
    tag: "New Customers",
    title: "First Rental? Get AED 50 Off",
    desc: "Welcome to Al Emad! Use your first-time discount on any car in our fleet. No minimum booking required.",
    cta: "Get Discount",
  },
];

const PromosSection = () => (
  <section id="promos" className="section-padding bg-muted/30">
    <div className="container">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Special Offers</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Exclusive Deals for You</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Take advantage of our limited-time promotions and save on your next rental.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {promos.map((p) => (
          <div key={p.title} className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover-lift flex flex-col">
            <div className="px-6 py-5 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.tag}</span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-foreground mb-3 font-sans">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.desc}</p>
              <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl">
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

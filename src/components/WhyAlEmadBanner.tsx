import bannerCar from "@/assets/banner-car.jpg";
import { Clock, Truck, Wrench, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { icon: Clock, label: "Book Online in Minutes" },
  { icon: Truck, label: "Free Car Delivery Across Dubai" },
  { icon: Wrench, label: "Free Service & Maintenance" },
  { icon: CreditCard, label: "Flexible Daily, Weekly & Monthly Plans" },
];

const WhyAlEmadBanner = () => (
  <section className="section-padding bg-muted/30 overflow-hidden">
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={bannerCar}
            alt="Premium car rental in Dubai"
            className="w-full h-[400px] lg:h-[500px] object-cover"
            loading="lazy"
            width={1200}
            height={800}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Text content */}
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6">
            Transparent Car Rental Prices in Dubai
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Al Emad Rent A Car is here to make your car rental experience in Dubai simple and reliable. With a wide range of vehicles to match every lifestyle, we prioritize your comfort and convenience — whether it's a short city ride or a long luxury drive. No hidden fees, no surprises — just the best rates in Dubai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-background rounded-xl p-4 border border-border hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{f.label}</span>
              </div>
            ))}
          </div>

          <Link to="/fleet">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl px-8">
              Explore Our Fleet
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default WhyAlEmadBanner;

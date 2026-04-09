import { Clock, Truck, Wrench, CreditCard } from "lucide-react";

const features = [
  { icon: Clock, label: "Book Online in Minutes" },
  { icon: Truck, label: "Free Car Delivery in Dubai" },
  { icon: Wrench, label: "Free Service & Maintenance" },
  { icon: CreditCard, label: "Flexible Rent a Car in Dubai" },
];

const WhyAlEmadBanner = () => (
  <section className="py-16">
    <div className="ml-auto pl-4 md:pl-8 lg:pl-16 max-w-[95%] md:max-w-[90%]">
      <div className="relative rounded-l-3xl overflow-hidden bg-gradient-to-br from-[hsl(var(--foreground))] via-[hsl(var(--foreground)/0.95)] to-[hsl(var(--foreground)/0.85)] px-8 md:px-14 py-10 md:py-12">
        {/* Decorative overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/30 to-transparent rounded-full blur-3xl translate-x-1/4" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-4">
            Affordable & Transparent<br />Rent a Car Prices in Dubai
          </h2>
          <p className="text-white/70 leading-relaxed max-w-5xl mb-8 text-sm md:text-base">
            At Al Emad Rent A Car, we make renting a car in Dubai effortless and dependable. With a diverse fleet to suit every lifestyle, your comfort and convenience are our top priorities. Whether you need a quick city ride or a luxurious long drive, Al Emad has you covered. For the best car rental rates in Dubai, trust Al Emad to deliver a seamless experience.
          </p>

          <div className="flex flex-wrap gap-6 md:gap-10">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyAlEmadBanner;

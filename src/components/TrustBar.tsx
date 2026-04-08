import { Users, Car, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "3,000+", label: "Happy Customers" },
  { icon: Car, value: "50+", label: "Vehicles Available" },
  { icon: Award, value: "10+", label: "Years of Service" },
  { icon: MapPin, value: "Free", label: "Delivery Across Dubai" },
];

const TrustBar = () => (
  <section className="py-12 bg-background">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;

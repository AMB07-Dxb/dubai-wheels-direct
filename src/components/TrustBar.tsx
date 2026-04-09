import { Users, Car, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "3,000+", label: "Happy Customers" },
  { icon: Car, value: "50+", label: "Vehicles Available" },
  { icon: Award, value: "10+", label: "Years of Service" },
  { icon: MapPin, value: "Free", label: "Delivery Across Dubai" },
];

const TrustBar = () => (
  <section className="py-16 bg-background border-y border-border">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;

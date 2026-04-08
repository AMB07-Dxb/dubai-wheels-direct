import { useState } from "react";
import { Car, Users, Fuel, Settings2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

type CarData = {
  name: string;
  image: string;
  daily: number;
  weekly: number;
  monthly: number;
  seats: number;
  category: string;
  featured?: boolean;
  oldDaily?: number;
};

const cars: CarData[] = [
  { name: "Kia Pegas 2022", image: "https://www.caryaati.com/erps/admin/images/model/pegas.webp?p=84", daily: 60, weekly: 385, monthly: 1350, seats: 5, category: "Economy", featured: true, oldDaily: 80 },
  { name: "Kia K5 2023", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_470_166.webp", daily: 110, weekly: 700, monthly: 2400, seats: 5, category: "Economy" },
  { name: "Hyundai Accent 2023", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_576_353.webp?p=84", daily: 55, weekly: 350, monthly: 1500, seats: 5, category: "Economy", featured: true, oldDaily: 75 },
  { name: "Mazda CX5 2021", image: "https://www.caryaati.com/erps/admin/images/model/model-165-775649.webp", daily: 90, weekly: 560, monthly: 2100, seats: 5, category: "SUV" },
  { name: "Hyundai Creta 2023", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_571_549.webp?p=84", daily: 75, weekly: 480, monthly: 1980, seats: 5, category: "SUV", featured: true, oldDaily: 95 },
  { name: "Peugeot 3008 2025", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_555_915.webp", daily: 110, weekly: 700, monthly: 2400, seats: 5, category: "SUV" },
  { name: "RollsRoyce Cullinan 2022", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_604_899.webp", daily: 4500, weekly: 30000, monthly: 115000, seats: 4, category: "Luxury" },
  { name: "Hyundai Elantra 2023", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_577_321.webp?p=84", daily: 80, weekly: 490, monthly: 2100, seats: 5, category: "Economy" },
  { name: "Mazda 3 2023", image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1140_201.png?p=84", daily: 75, weekly: 480, monthly: 1980, seats: 5, category: "Economy" },
];

const categories = ["All", "Economy", "SUV", "Luxury"];

const FleetSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cars : cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="section-padding bg-muted/40">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Our Fleet</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Find Your Perfect Ride</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={active === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActive(cat)}
                className={active === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((car) => (
            <CarCard key={car.name} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CarCard = ({ car }: { car: CarData }) => (
  <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border hover:border-primary/20 hover-lift">
    <div className="relative h-52 bg-gradient-to-br from-muted to-muted/30 overflow-hidden">
      <img src={car.image} alt={car.name} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
        {car.featured && (
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase flex items-center gap-1">
            <Tag className="w-3 h-3" /> Promo
          </span>
        )}
      </div>
      <span className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">In Stock</span>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold text-card-foreground mb-3 font-sans">{car.name}</h3>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats} Seats</span>
        <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> Auto</span>
        <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> Petrol</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center mb-5">
        <PriceBlock label="Daily" value={car.daily} oldValue={car.oldDaily} />
        <PriceBlock label="Weekly" value={car.weekly} />
        <PriceBlock label="Monthly" value={car.monthly} />
      </div>
      <div className="flex gap-2">
        <a href="https://wa.me/97145573386" target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-md shadow-primary/15">
            <Car className="w-4 h-4" /> Book Now
          </Button>
        </a>
        <a href="tel:+97145573386">
          <Button variant="outline" className="border-border hover:border-primary/30 px-3">
            📞
          </Button>
        </a>
      </div>
    </div>
  </div>
);

const PriceBlock = ({ label, value, oldValue }: { label: string; value: number; oldValue?: number }) => (
  <div className="bg-accent rounded-xl py-2.5 px-1">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    {oldValue && (
      <p className="text-[10px] text-primary line-through font-medium">{oldValue} AED</p>
    )}
    <p className="text-sm font-bold text-foreground">{value.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">AED</span></p>
  </div>
);

export default FleetSection;

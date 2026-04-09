import { allCars } from "@/data/cars";
import { Users, Fuel, Settings2, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featured = allCars.filter(c => 
  ["kia-pegas-2025", "mazda-3-2025", "hyundai-creta-2022", "kia-k5-2023", "peugeot-3008-2025", "infiniti-q50-2023"].includes(c.id)
);

const HomeFeaturedCars = () => (
  <section className="section-padding bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Popular Picks</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Featured Vehicles</h2>
        </div>
        <Link to="/fleet">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
            View All Cars <Car className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {featured.map((car) => (
          <Link key={car.id} to={`/fleet/${car.id}`} className="block">
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border hover:border-primary/20 hover-lift">
              <div className="relative h-52 bg-muted/30 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-card-foreground mb-3 font-sans">{car.name}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats} Seats</span>
                  <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> {car.transmission}</span>
                  <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <PriceBlock label="Daily" value={car.daily} />
                  <PriceBlock label="Weekly" value={car.weekly} />
                  <PriceBlock label="Monthly" value={car.monthly} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-accent rounded-xl py-2.5 px-1">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-sm font-bold text-foreground">{value.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">AED</span></p>
  </div>
);

export default HomeFeaturedCars;

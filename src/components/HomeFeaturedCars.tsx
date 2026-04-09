import { allCars } from "@/data/cars";
import { Users, Fuel, Settings2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featured = allCars.filter(c =>
  ["kia-pegas-2025", "mazda-3-2025", "hyundai-creta-2022", "kia-k5-2023", "peugeot-3008-2025", "infiniti-q50-2023"].includes(c.id)
);

const HomeFeaturedCars = () => (
  <section className="section-padding bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Popular Picks</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Featured Vehicles</h2>
        </div>
        <Link to="/fleet">
          <Button variant="outline" className="border-foreground/15 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary gap-2 rounded-xl transition-all duration-300">
            View All Cars <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((car) => (
          <Link key={car.id} to={`/fleet/${car.id}`} className="block group">
            <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover-lift">
              <div className="relative h-52 bg-muted/30 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3 font-sans">{car.name}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats}</span>
                  <span className="flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> {car.transmission}</span>
                  <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-5">
                  <PriceBlock label="Daily" value={car.daily} />
                  <PriceBlock label="Weekly" value={car.weekly} />
                  <PriceBlock label="Monthly" value={car.monthly} />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm rounded-xl">
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-muted rounded-xl py-2.5 px-1">
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-sm font-bold text-foreground">{value.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">AED</span></p>
  </div>
);

export default HomeFeaturedCars;

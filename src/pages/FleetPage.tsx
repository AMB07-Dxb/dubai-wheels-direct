import { useState } from "react";
import { allCars, categories, brands } from "@/data/cars";
import { Users, Fuel, Settings2, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FleetPage = () => {
  const [activeCat, setActiveCat] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");

  const filtered = allCars
    .filter(c => activeCat === "All" || c.category === activeCat)
    .filter(c => activeBrand === "All" || c.brand === activeBrand);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-12 bg-surface-dark">
        <div className="container">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-2">Our Fleet</p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-surface-dark-foreground mb-2">Find Your Perfect Ride</h1>
          <p className="text-surface-dark-foreground/50 max-w-lg">Browse our complete collection of {allCars.length}+ vehicles.</p>
        </div>
      </section>

      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-xl z-40">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <Button key={cat} variant={activeCat === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCat(cat)}
                className={activeCat === cat ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={activeBrand === "All" ? "default" : "outline"} size="sm" onClick={() => setActiveBrand("All")}
              className={activeBrand === "All" ? "bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}>
              All Brands
            </Button>
            {brands.map(b => (
              <Button key={b} variant={activeBrand === b ? "default" : "outline"} size="sm" onClick={() => setActiveBrand(b)}
                className={activeBrand === b ? "bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}>
                {b}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} vehicles found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(car => (
              <Link key={car.id} to={`/fleet/${car.id}`} className="block">
                <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border hover:border-primary/20 hover-lift h-full">
                  <div className="relative h-48 bg-muted/30 overflow-hidden">
                    <img src={car.image} alt={car.name} className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">{car.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-card-foreground mb-2 font-sans">{car.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {car.seats}</span>
                      <span className="flex items-center gap-1"><Settings2 className="w-3 h-3" /> {car.transmission}</span>
                      <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> {car.fuel}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center mb-4">
                      <PriceBlock label="Daily" value={car.daily} />
                      <PriceBlock label="Weekly" value={car.weekly} />
                      <PriceBlock label="Monthly" value={car.monthly} />
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm">
                      <Car className="w-4 h-4" /> View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PriceBlock = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-accent rounded-lg py-2 px-1">
    <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
    <p className="text-xs font-bold text-foreground">{value.toLocaleString()} <span className="text-[9px] font-normal text-muted-foreground">AED</span></p>
  </div>
);

export default FleetPage;
